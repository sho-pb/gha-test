(async () => {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY;
  const GITHUB_SHA = process.env.GITHUB_SHA;
  const TRUNKVER = process.env.TRUNKVER;
  const IS_DRAFT = process.env.IS_DRAFT === 'true';

  if (!GITHUB_TOKEN || !GITHUB_REPOSITORY || !GITHUB_SHA) process.exit(1);

  const payload = {
    tag_name: TRUNKVER,
    name: TRUNKVER,
    target_commitish: 'main',
    generate_release_notes: true,
    draft: IS_DRAFT,
    prerelease: false,
  };

  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_REPOSITORY}/releases`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`GitHub release failed with status ${response.status}`);
    console.error(errorText);
    process.exit(1);
  }
})();
