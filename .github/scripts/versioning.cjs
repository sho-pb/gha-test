const { generateTrunkVer } = require('./trunk-ver');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY;
const GITHUB_SHA = process.env.GITHUB_SHA;
const COMMIT_HASH = process.env.COMMIT_HASH;
const BUILD_ID = process.env.BUILD_ID;

if (!GITHUB_TOKEN || !GITHUB_REPOSITORY || !GITHUB_SHA) process.exit(1);

const tag = generateTrunkVer(COMMIT_HASH, BUILD_ID);

const payload = {
  tag_name: tag,
  name: tag,
  target_commitish: GITHUB_SHA,
  generate_release_notes: true,
  draft: false,
  prerelease: false,
};

const response = await fetch(`https://api.github.com/repos/${GITHUB_REPOSITORY}/releases`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
});

if (!response.ok) {
  const errorText = await response.text();
  console.error(`GitHub release failed with status ${response.status}`);
  console.error(errorText);
  process.exit(1);
}
