export const translations = {
  en: {
    app: {
      title: "Piet Programming Tool",
      subtitle: "Create beautiful programs where code is art",
      description: "Click cells to paint with Piet colors and create visual programs"
    },
    toolbar: {
      new: "New",
      save: "Save",
      load: "Load", 
      download: "Download",
      undo: "Undo",
      redo: "Redo",
      settings: "Settings",
      zoom_in: "Zoom In",
      zoom_out: "Zoom Out",
      zoom_fit: "Fit to Screen"
    },
    tools: {
      brush: "Brush",
      fill: "Fill",
      eraser: "Eraser",
      eyedropper: "Eyedropper",
      select: "Select"
    },
    canvas: {
      grid_size: "Grid Size",
      brush_size: "Brush Size", 
      show_grid: "Show Grid",
      clear_canvas: "Clear Canvas"
    },
    colors: {
      title: "Piet Colors",
      selected: "Selected",
      recent: "Recent Colors"
    },
    settings: {
      title: "Settings",
      language: "Language",
      theme: "Theme",
      light: "Light",
      dark: "Dark",
      auto: "Auto",
      grid_options: "Grid Options",
      export_options: "Export Options"
    },
    messages: {
      new_canvas: "New canvas created! Start programming in Piet!",
      program_saved: "Piet program saved successfully!",
      program_loaded: "Piet program loaded successfully!",
      program_downloaded: "Piet program downloaded!",
      canvas_cleared: "Canvas cleared!",
      no_undo: "Nothing to undo",
      no_redo: "Nothing to redo",
      fill_complete: "Area filled successfully",
      color_picked: "Color picked from canvas"
    },
    examples: {
      title: "Example Programs",
      hello_world: "Hello World",
      fibonacci: "Fibonacci Sequence", 
      calculator: "Simple Calculator",
      load_example: "Load Example"
    }
  },
  de: {
    app: {
      title: "Piet Programmier-Tool",
      subtitle: "Erstelle schöne Programme, bei denen Code Kunst ist",
      description: "Klicke auf Zellen, um mit Piet-Farben zu malen und visuelle Programme zu erstellen"
    },
    toolbar: {
      new: "Neu",
      save: "Speichern",
      load: "Laden",
      download: "Herunterladen",
      undo: "Rückgängig",
      redo: "Wiederholen",
      settings: "Einstellungen",
      zoom_in: "Vergrößern",
      zoom_out: "Verkleinern",
      zoom_fit: "An Bildschirm anpassen"
    },
    tools: {
      brush: "Pinsel",
      fill: "Füllen",
      eraser: "Radierer",
      eyedropper: "Pipette",
      select: "Auswählen"
    },
    canvas: {
      grid_size: "Rastergröße",
      brush_size: "Pinselgröße",
      show_grid: "Raster anzeigen",
      clear_canvas: "Leinwand löschen"
    },
    colors: {
      title: "Piet-Farben",
      selected: "Ausgewählt",
      recent: "Zuletzt verwendet"
    },
    settings: {
      title: "Einstellungen",
      language: "Sprache",
      theme: "Design",
      light: "Hell",
      dark: "Dunkel",
      auto: "Automatisch",
      grid_options: "Raster-Optionen",
      export_options: "Export-Optionen"
    },
    messages: {
      new_canvas: "Neue Leinwand erstellt! Beginne mit der Piet-Programmierung!",
      program_saved: "Piet-Programm erfolgreich gespeichert!",
      program_loaded: "Piet-Programm erfolgreich geladen!",
      program_downloaded: "Piet-Programm heruntergeladen!",
      canvas_cleared: "Leinwand gelöscht!",
      no_undo: "Nichts rückgängig zu machen",
      no_redo: "Nichts zu wiederholen",
      fill_complete: "Bereich erfolgreich gefüllt",
      color_picked: "Farbe von der Leinwand ausgewählt"
    },
    examples: {
      title: "Beispielprogramme",
      hello_world: "Hallo Welt",
      fibonacci: "Fibonacci-Folge",
      calculator: "Einfacher Rechner",
      load_example: "Beispiel laden"
    }
  }
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;