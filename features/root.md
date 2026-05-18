# 一键 ROOT

本页介绍如何使用工具箱获取设备的 Root 权限。

## 前置条件

使用 ROOT 功能前，需要满足以下条件：

- 设备的 Bootloader **已经解锁**（可先使用「小米解锁 BL」功能）
- 手机已开启 USB 调试
- 手机已用数据线连接到电脑

## 操作流程

### 第一步：检测设备

1. 打开「一键 ROOT」页面。
2. 点击 **「检测设备」**。
3. 等待工具读取设备信息。

<img class="doc-screenshot" src="/screenshots/root-wait-device.png" alt="一键 ROOT 等待设备">

检测结果会显示设备品牌、型号、Android 版本和芯片信息。同时工具会自动判断哪种 ROOT 方案适合你的设备。

<img class="doc-screenshot" src="/screenshots/root-detected-schemes.png" alt="一键 ROOT 设备检测结果">

### 第二步：选择方案

根据你的设备情况，工具会推荐以下方案之一：

**方案一：自动提取镜像（推荐）**

适用于大部分小米/红米设备。工具会自动从设备中提取需要的镜像文件，无需手动准备。

**方案二：从卡刷包提取**

工具会根据你的系统版本自动匹配卡刷包并提取镜像。如果无法自动匹配，需要手动选择你的系统版本。

<img class="doc-screenshot" src="/screenshots/root-extract-progress.png" alt="自动拼接卡刷包并提取镜像">

**方案三：手动提供镜像**

如果以上方案都不可用，需要你自己准备 `boot.img` 或 `init_boot.img` 文件，然后填写文件路径。

### 第三步：选择 ROOT 管理器

工具支持以下 ROOT 管理器：

| 管理器 | 特点 |
| --- | --- |
| Magisk Alpha | 更新较快，兼容性好 |
| Magisk 官方 | 稳定版本 |
| KernelSU | 基于内核，更隐蔽 |
| APatch | 轻量方案 |

如果不确定选哪个，保持默认的「Magisk Alpha」即可。

<img class="doc-screenshot" src="/screenshots/root-select-manager.png" alt="选择 ROOT 管理器">

### 第四步：选择修补方式

- **修补并刷入**：工具会自动完成镜像修补和刷入，推荐使用。
- **仅修补镜像**：只生成修补后的镜像文件，由你自己手动刷入。

### 第五步：执行

点击 **「修补并刷入」** 按钮，工具会自动：

1. 推送镜像到设备
2. 在设备上执行修补
3. 刷入修补后的镜像
4. 重启设备

<img class="doc-screenshot" src="/screenshots/root-execute-push.png" alt="ROOT 执行过程">

等待日志显示完成即可。

## 完成后

ROOT 成功后，设备上会出现对应的 ROOT 管理器应用。你可以通过它管理应用的 Root 权限。

<img class="doc-screenshot" src="/screenshots/root-success.png" alt="ROOT 成功页面">

## 常见问题

**Q：ROOT 后手机无法开机？**

进入 Fastboot 模式（关机后按住音量减+电源键），使用工具提取的原版镜像或卡刷包中的原版镜像刷回即可。

**Q：ROOT 会影响系统更新吗？**

通常不影响，但更新后 Root 可能会丢失，需要重新执行 ROOT。
