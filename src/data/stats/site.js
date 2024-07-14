import dayjs from "dayjs";

/* Keys match keys returned by the github api. Fields without keys are
 * mostly jokes. To see everything returned by the github api, run:
 curl https://api.github.com/repos/gnpaone/my-personal-website
 */
const data = [
  {
    label: "Stars this repository has on github",
    key: "stargazers_count",
    link: "https://github.com/gnpaone/naveen-personal-website/stargazers",
  },
  {
    label: "Number of people watching this repository",
    key: "subscribers_count",
    link: "https://github.com/gnpaone/naveen-personal-website/stargazers",
  },
  {
    label: "Number of forks",
    key: "forks",
    link: "https://github.com/gnpaone/naveen-personal-website/network",
  },
  {
    label: "Number of linter warnings",
    value: "0", // enforced via github workflow
  },
  {
    label: "Open github issues",
    key: "open_issues_count",
    link: "https://github.com/gnpaone/naveen-personal-website/issues",
  },
  {
    label: "Last updated at",
    key: "pushed_at",
    link: "https://github.com/gnpaone/naveen-personal-website/commits",
    format: (x) => dayjs(x).format("MMMM DD, YYYY"),
  },
  {
    // TODO update this with a pre-commit hook
    /* find . | grep ".js" | grep -vE ".min.js|node_modules|.git|.json" |
    xargs -I file cat file | wc -l */
    label: "Lines of Javascript powering this website",
    value: "0",  // default value, will be updated dynamically
    link: "https://github.com/gnpaone/naveen-personal-website/graphs/contributors",
  },
];

export default data;
