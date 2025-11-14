# Jinni's Teleprompter

![alt text](<public/Screenshot 2025-11-14 003340.png>)

A cross-platform desktop teleprompter application built with React, TypeScript, Vite, and Neutralino/Buntralino. Perfect for video production, presentations, and live performances.

## Features

- **Rich Text Editing**: Edit your scripts with a built-in rich text editor
- **Customizable Appearance**:
  - Adjustable font size (5-15 rem)
  - Custom font and background colors
  - Customizable instruction text color
- **Auto-Scroll**: Automatic scrolling with adjustable speed (0-100)
- **Placemarker**: Visual indicator to help track your reading position
- **Flip Modes**: Mirror your text horizontally, vertically, or both for teleprompter setups
- **File Management**:
  - Load and save plain text files (.txt)
  - Save and load complete projects (.json) with all settings
- **Cross-Platform**: Works on Windows, macOS, and Linux

## Prerequisites

- [Bun](https://bun.sh/) (v1.0.0 or later) - The JavaScript runtime and package manager

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd teleprompter
```

2. Install dependencies:

```bash
bun install
```

## Development

To run the application in development mode:

```bash
bun run dev
```

This will:

- Start the Vite development server
- Launch the Buntralino desktop application
- Enable hot module replacement for fast development

## Building

To build the application for production:

```bash
bun run build
```

This command will:

1. Build the React application using Vite
2. Package it as a desktop application using Buntralino
3. Create platform-specific executables in the `build/` directory

### Build Output

The build process creates executables for multiple platforms:

- **Windows x64**: `build/Windows x64/teleprompter.exe`
- **macOS x64**: `build/MacOS x64/teleprompter` (or `build/MacOS x64 App/teleprompter.app`)
- **macOS arm64**: `build/MacOS arm64/teleprompter` (or `build/MacOS arm64 App/teleprompter.app`)
- **Linux x64**: `build/Linux x64/teleprompter`
- **Linux arm64**: `build/Linux arm64/teleprompter`

### Windows Build Note

If you see warnings about "Resource section" or "pe-library" during the Windows build, this is a known issue with metadata patching. The application will still build and function correctly - only the icon/metadata embedding may fail, which doesn't affect functionality.

## Usage

### Getting Started

1. **Setup Page**: When you first open the app, you'll see the Setup page where you can:

   - Load a text file or project file
   - Configure teleprompter settings
   - Customize appearance
   - Navigate to the editor or start the prompter

2. **Editor Page**: Click "Edit Script" to:

   - Edit your script text with rich text formatting
   - Save your changes and return to setup

3. **Prompter Page**: Click "Run Teleprompter" to:
   - View your script in full-screen prompter mode
   - Use auto-scroll (if enabled) with play/pause controls
   - Manually scroll through your script
   - Return to setup to make changes

### File Operations

#### Loading Text Files

- Click "Load Text File" in the File Operations card
- Select a `.txt` file from your system
- The text will be loaded into the editor

#### Saving Text Files

- Enter or edit your script text
- Click "Save Text File"
- Enter a filename (without extension)
- Choose where to save the `.txt` file

#### Saving Projects

- Configure your settings and script
- Click "Save Project"
- Enter a filename (without extension)
- Choose where to save the `.json` file
- Projects save both your script text and all settings

#### Loading Projects

- Click "Load Project"
- Select a previously saved `.json` project file
- Your script and settings will be restored

### Settings

#### Scroll Settings

- **Auto Scroll**: Enable/disable automatic scrolling
- **Scroll Speed**: Adjust from 0 (slow) to 100 (fast)
- **Placemarker**: Show/hide a visual indicator at your reading position

#### Appearance Settings

- **Font Size**: Adjust from 5 to 15 rem
- **Font Color**: Choose the text color (hex code)
- **Background Color**: Choose the background color (hex code)
- **Instructions Color**: Choose the color for instruction text (hex code)
- **Flip Mode**:
  - None: Normal display
  - Horizontal: Mirror left-to-right (for teleprompter mirrors)
  - Vertical: Flip top-to-bottom
  - Both: Flip both ways

### Keyboard Shortcuts

- Use your mouse wheel or trackpad to scroll manually in prompter mode
- Click and drag the scrollbar for precise control

## Project Structure

```
teleprompter/
├── src/
│   ├── components/          # React components
│   │   ├── AppearanceCard.tsx
│   │   ├── FileOperationsCard.tsx
│   │   ├── SettingsCard.tsx
│   │   └── settings/        # Settings UI components
│   ├── pages/               # Main application pages
│   │   ├── SetupPage.tsx    # Configuration and setup
│   │   ├── EditorPage.tsx   # Script editor
│   │   └── PrompterPage.tsx # Teleprompter display
│   ├── services/            # Business logic
│   │   └── fileService.ts   # File I/O operations
│   ├── styles/              # CSS styles
│   ├── types.ts             # TypeScript type definitions
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Application entry point
├── public/                  # Static assets
├── app/                     # Built application assets
├── build/                   # Production builds
├── neutralino.config.json   # Neutralino configuration
├── vite.config.mts          # Vite build configuration
└── package.json            # Dependencies and scripts
```

## Technology Stack

- **React 19**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **Neutralino**: Desktop application framework
- **Buntralino**: Bun integration for Neutralino
- **Bun**: JavaScript runtime and package manager

## Troubleshooting

### Build Issues

- **Windows metadata patching warnings**: These are harmless and don't affect functionality
- **Build fails**: Ensure you have Bun installed and all dependencies are installed with `bun install`

### Runtime Issues

- **File operations fail**: Ensure you have proper file system permissions
- **Auto-scroll not working**: Check that "Auto Scroll" is enabled in settings and click "Play Auto Scroll" in prompter mode

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

Built with [Buntralino](https://buntralino.github.io/) and [Neutralino](https://neutralino.js.org/).
