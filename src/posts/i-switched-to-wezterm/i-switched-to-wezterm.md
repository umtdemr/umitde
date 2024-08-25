---
title: I switched to WezTerm
description: I switched to WezTerm from iTerm2. Here I explain why I switched and how I configured it.
date: "2024-08-26"
lastUpdated: '2024-08-25T21:37:10.063Z'
slug: i-switched-to-wezterm
published: true
image: i-switched-to-wezterm.png
imageAlt: "a terminal comparison. there is iterm2 on the left. there is wezterm on the right."
categories:
    - General
---

<script>
    import ExternalLink from "$lib/components/externalLink/ExternalLink.svelte";
</script>

Recently, I've started to use <ExternalLink link="https://wezfurlong.org/wezterm/index.html" text="WezTerm" /> as my terminal over <ExternalLink link="https://iterm2.com/" text="iTerm2" /> + <ExternalLink link="https://github.com/tmux/tmux/wiki" text="tmux" />. I include tmux here because WezTerm has builtin tmux-like functionality as well.

## Why the change

I've explored terminal emulators in Linux, macOS, and Windows before. On Windows, I found the Windows Terminal (in the store) to be adequate for that environment. In Linux, after experimenting with several options, I moved Alacritty. However, when I started to use macOS (I have my reasons), Alacritty didn't quite meet my expectations. Despite its cross-platform nature, it lacked the familiar feel I'd grown accustomed to in Linux. This led me to adopt iTerm2, which I found satisfactory, especially when paired with tmux. iTerm2 served as my go-to terminal for quite some time. Recently, I discovered WezTerm, a new cross-platform terminal emulator written in Rust. I decided to give it a try. After using WezTerm for a while now, I can confidently say it has met my needs. If you're considering trying it out, I'd recommend starting without tmux. In my experience, WezTerm inherently provides many of the features I previously relied on tmux for.


## My Configuration

~/.config/wezterm/wezterm.lua

```lua
local wezterm = require 'wezterm'

local config = wezterm.config_builder()
local act = wezterm.action


config.color_scheme = 'Poimandres'
config.window_background_opacity = 0.9
config.macos_window_background_blur = 20
config.font = wezterm.font("JetBrains Mono", { weight = "Medium" })
config.font_size = 16
config.initial_rows = 45
config.initial_cols = 175

-- enable scroll bar
config.enable_scroll_bar = true
config.use_fancy_tab_bar = false
config.tab_bar_at_bottom = true

-- adds effect to the inactive pane
config.inactive_pane_hsb = {
  saturation = 0.25,
  brightness = 0.5
}

config.scrollback_lines = 5000

-- configures whether the window has a title bar and/or resizable border.
config.window_decorations = "RESIZE"

config.default_workspace = "main"

-- disable right option and enable left option key for mac
config.send_composed_key_when_left_alt_is_pressed = true
config.send_composed_key_when_right_alt_is_pressed = false

-- my leader key is a, similar to tmux.
config.leader = { key = 'a', mods = 'CMD', timeout_milliseconds = 2000 }

-- key bindings
config.keys = {
  { key = 'c', mods = 'LEADER', action = act.ActivateCopyMode },
  { key = 'R', mods = 'SHIFT|CTRL', action = act.ReloadConfiguration },
  { key = '=', mods = 'LEADER', action = act.IncreaseFontSize },
  { key = '-', mods = 'CTRL', action = act.DecreaseFontSize },
  { key = '0', mods = 'CTRL', action = act.ResetFontSize },

  -- pane
  { key = '"', mods = 'LEADER', action = act.SplitVertical { domain = "CurrentPaneDomain" }},
  { key = '%', mods = 'LEADER', action = act.SplitHorizontal { domain = "CurrentPaneDomain" }},
  { key = 'h', mods = 'LEADER', action = act.ActivatePaneDirection("Left") },
  { key = 'j', mods = 'LEADER', action = act.ActivatePaneDirection("Down") },
  { key = 'k', mods = 'LEADER', action = act.ActivatePaneDirection("Up") },
  { key = 'l', mods = 'LEADER', action = act.ActivatePaneDirection("Right") },
  { key = 'x', mods = 'LEADER', action = act.CloseCurrentPane { confirm = true } },
  { key = 'z', mods = 'LEADER', action = act.TogglePaneZoomState },
  { key = 's', mods = 'LEADER', action = act.RotatePanes "Clockwise" },
  { key = 'v', mods = 'LEADER', action = act.ActivateKeyTable { name = "resize_pane", one_shot = false } },
  { key = "w", mods = "LEADER",       action = act.ShowLauncherArgs { flags = "FUZZY|WORKSPACES" } },

  -- tab
  { key = "t",          mods = "LEADER",      action = act.SpawnTab("CurrentPaneDomain") },
  { key = "[",          mods = "LEADER",      action = act.ActivateTabRelative(-1) },
  { key = "]",          mods = "LEADER",      action = act.ActivateTabRelative(1) },
  { key = "n",          mods = "LEADER",      action = act.ShowTabNavigator },
  -- rename tab
  {
    key = ",",
    mods = "LEADER",
    action = act.PromptInputLine {
      description = wezterm.format {
        { Attribute = { Intensity = "Bold" } },
        { Foreground = { AnsiColor = "Fuchsia" } },
        { Text = "Renaming Tab Title...:" },
      },
      action = wezterm.action_callback(function(window, pane, line)
        if line then
          window:active_tab():set_title(line)
        end
      end)
    }
  },
  -- Key table for moving tabs around
  { key = "m", mods = "LEADER",       action = act.ActivateKeyTable { name = "move_tab", one_shot = false } },
  { key = "{", mods = "LEADER|SHIFT", action = act.MoveTabRelative(-1) },
  { key = "}", mods = "LEADER|SHIFT", action = act.MoveTabRelative(1) },

  -- bind
  { key = "UpArrow", mods = "LEADER", action = act.ScrollByPage(-1) },
  { key = "DownArrow", mods = "LEADER", action = act.ScrollByPage(1) },
}

config.key_tables = {
  resize_pane = {
    { key = "h",      action = act.AdjustPaneSize { "Left", 1 } },
    { key = "j",      action = act.AdjustPaneSize { "Down", 1 } },
    { key = "k",      action = act.AdjustPaneSize { "Up", 1 } },
    { key = "l",      action = act.AdjustPaneSize { "Right", 1 } },
    { key = "Escape", action = "PopKeyTable" },
    { key = "Enter",  action = "PopKeyTable" },
  },
}

-- switch to tabs with index
for i = 1, 9 do
  table.insert(config.keys, {
    key = tostring(i),
    mods = "LEADER",
    action = act.ActivateTab(i - 1)
  })
end

return config
```

You can also the add status panel -- I got the configuration below from [theopn](https://github.com/theopn).

```lua
wezterm.on("update-status", function(window, pane)
  -- Workspace name
  local stat = window:active_workspace()
  local stat_color = "#f7768e"
  -- It's a little silly to have workspace name all the time
  -- Utilize this to display LDR or current key table name
  if window:active_key_table() then
    stat = window:active_key_table()
    stat_color = "#7dcfff"
  end
  if window:leader_is_active() then
    stat = "LDR"
    stat_color = "#bb9af7"
  end

  local basename = function(s)
    -- Nothing a little regex can't fix
    return string.gsub(s, "(.*[/\\])(.*)", "%2")
  end

  -- Current working directory
  local cwd = pane:get_current_working_dir()
  if cwd then
    if type(cwd) == "userdata" then
      -- Wezterm introduced the URL object in 20240127-113634-bbcac864
      cwd = basename(cwd.file_path)
    else
      -- 20230712-072601-f4abf8fd or earlier version
      cwd = basename(cwd)
    end
  else
    cwd = ""
  end

  -- Current command
  local cmd = pane:get_foreground_process_name()
  -- CWD and CMD could be nil (e.g. viewing log using Ctrl-Alt-l)
  cmd = cmd and basename(cmd) or ""

  -- Time
  local time = wezterm.strftime("%H:%M")

  -- Left status (left of the tab line)
  window:set_left_status(wezterm.format({
    { Foreground = { Color = stat_color } },
    { Text = "  " },
    { Text = wezterm.nerdfonts.oct_table .. "  " .. stat },
    { Text = " |" },
  }))

  -- Right status
  window:set_right_status(wezterm.format({
    { Text = wezterm.nerdfonts.md_folder .. "  " .. cwd },
    { Text = " | " },
    { Foreground = { Color = "#e0af68" } },
    { Text = wezterm.nerdfonts.fa_code .. "  " .. cmd },
    "ResetAttributes",
    { Text = " | " },
    { Text = wezterm.nerdfonts.md_clock .. "  " .. time },
    { Text = "  " },
  }))
end)
```
