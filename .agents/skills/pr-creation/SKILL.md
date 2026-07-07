---
name: pr-creation
description: A skill that helps users create pull requests (PRs) or merge requests (MRs) with a specific title format. It ensures that the title includes a Jira reference and follows the required structure. Use this skill to ensure every pull request and merge request title follows this format: `type/DLSR-xxxx-short-description`
---

# PR Creation Skill

Rules:

- `type` must be one of `feature`, `bugfix`, or `chore`. Feature is for new functionality, bugfix is for fixing issues, and chore is for maintenance tasks that do not add new functionality or fix bugs.
- `DLSR-xxxx` must be a Jira reference in the exact format `DLSR-` followed by two to five digits.
- `short-description` must be lowercase, hyphen-separated, and concise.
- Apply the same format to both pull requests and merge requests.

Examples:

- `feature/DLSR-1234-add-login-validation`
- `bugfix/DLSR-0456-fix-null-pointer`
- `chore/DLSR-9876-update-dependencies`

When a title does not match this pattern, rewrite it to match before creating or updating the PR/MR.

If a Jira reference is missing, prompt the user to provide one before proceeding. If the user does not provide a Jira reference, create the PR without it. This can only be done for chore type MRs, and the user must confirm that it is a chore type MR before proceeding without a Jira reference.