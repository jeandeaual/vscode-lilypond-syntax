# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.163.0/containers/typescript-node/.devcontainer/base.Dockerfile

# [Choice] Node.js version: 16, 14, 12, 10
ARG VARIANT="16"
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${VARIANT}

# Install additional global node packages
RUN su node -c "npm install -g yo generator-code"

RUN yarn set version stable

# Install the yq command (to convert from JSON to YAML)
COPY --from=mikefarah/yq:4 /usr/bin/yq /usr/bin/yq
