# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.163.0/containers/typescript-node/.devcontainer/base.Dockerfile

# [Choice] Node.js version: 14, 12, 10
ARG VARIANT="14-buster"
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${VARIANT}

# Install the yq command (to convert from JSON to YAML)
COPY --from=mikefarah/yq:4 /usr/bin/yq /usr/bin/yq
