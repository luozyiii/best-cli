# 安装 utils 依赖
cd utils/
yarn
cd ../

# 安装 models/command 依赖
cd models/command/
yarn
cd ../../

# 安装 models/package 依赖
cd models/package/
yarn
cd ../../

# 安装 commands/init 依赖
cd commands/init/
yarn
cd ../../

# 安装 core/exec 依赖
cd core/exec/
yarn
cd ../../

# 安装 core/cli 依赖
cd core/cli/
yarn
yarn unlink
yarn link

