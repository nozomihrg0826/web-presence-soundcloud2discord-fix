async function buildThemeMotion(container) {
  // Theme
  const { theme: savedTheme } = await browser.storage.local.get("theme");
  let themeConfig = savedTheme ?? "dark";

  const themeOptions = [
    { value: "dark", text: i18n.t("settings.theme.dark") },
    { value: "light", text: i18n.t("settings.theme.light") },
  ];

  const themeWrap = createSelectRow(
    i18n.t("settings.theme"),
    "theme-wrapper",
    themeOptions,
    themeConfig,
    debounce(async (e) => {
      themeConfig = e.target.value;

      await browser.storage.local.set({ theme: themeConfig });

      document.documentElement.setAttribute("data-theme", themeConfig);
      document.body.setAttribute("data-theme", themeConfig);
      document.body.style = "";

      await browser.storage.local.remove("colorSettings");
      await applyColorSettings();
      await applyBackgroundSettings();
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      await updateAllSwatchesForTheme();
    }, 300),
  );

  container.appendChild(themeWrap);

  // Motion
  const motionStorage = await browser.storage.local.get(motionKey);
  const motionConfig = motionStorage[motionKey] ?? "always";

  const motionOptions = [
    { value: "system", text: i18n.t("common.system") },
    { value: "always", text: i18n.t("common.enable") },
    { value: "never", text: i18n.t("common.disable") },
  ];

  const motionWrap = createSelectRow(i18n.t("settings.animations"), "motion-wrapper", motionOptions, motionConfig, async (e) => {
    await setMotionPreference(e.target.value);
  });

  container.appendChild(motionWrap);

  // Normalization
  const { normalization: normalizationValue } = await browser.storage.local.get("normalization");
  let normalizationConfig = normalizationValue ?? "cleanTitle";

  const normalizationOptions = [
    { value: "enable", text: i18n.t("common.enable") },
    { value: "cleanTitle", text: i18n.t("settings.normalization.cleanTitle") },
    { value: "stripDashPrefix", text: i18n.t("settings.normalization.stripDashPrefix") },
    { value: "disable", text: i18n.t("common.disable") },
  ];

  const normalizationWrap = createSelectRow(
    i18n.t("settings.normalization"),
    "normalization-wrapper",
    normalizationOptions,
    normalizationConfig,
    debounce(async (e) => {
      normalizationConfig = e.target.value;
      await browser.storage.local.set({ normalization: normalizationConfig });
    }, 300),
  );

  const normalizationTip = document.createElement("span");
  normalizationTip.className = "settings-option-tip";
  normalizationTip.textContent = "i";

  normalizationTip.addEventListener("click", async () => {
    const body = h(
      "span",
      {},
      h("b", {}, i18n.t("common.enable")),
      h("br", {}),
      i18n.t("settings.normalization.tip.enable"),
      h("br", {}),
      h("br", {}),
      h("b", {}, i18n.t("settings.normalization.cleanTitle")),
      h("br", {}),
      i18n.t("settings.normalization.tip.cleanTitle"),
      h("br", {}),
      h("br", {}),
      h("b", {}, i18n.t("settings.normalization.stripDashPrefix")),
      h("br", {}),
      i18n.t("settings.normalization.tip.stripDashPrefix"),
      h("br", {}),
      h("br", {}),
      h("b", {}, i18n.t("common.disable")),
      h("br", {}),
      i18n.t("settings.normalization.tip.disable"),
    );
    await showAlert(i18n.t("settings.normalization"), body, "tip");
  });

  normalizationWrap.querySelector("label").appendChild(normalizationTip);
  container.appendChild(normalizationWrap);

  // Status Display Type
  const { statusDisplayType: statusDisplayTypeValue } = await browser.storage.local.get("statusDisplayType");
  let statusDisplayTypeConfig = statusDisplayTypeValue ?? "3";

  const displayTypes = ["settings.statusDisplayType.source", "settings.statusDisplayType.title", "settings.statusDisplayType.details"];

  const statusDisplayTypeOptions = [
    { value: "0", text: i18n.t(displayTypes[0]) },
    { value: "1", text: i18n.t(displayTypes[1]) },
    { value: "2", text: i18n.t(displayTypes[2]) },
    { value: "3", text: "SongName - Artist" },
    { value: "4", text: "Artist - SongName" },
  ];

  const statusDisplayTypeWrap = createSelectRow(
    i18n.t("settings.statusDisplayType"),
    "statusDisplayType-wrapper",
    statusDisplayTypeOptions,
    statusDisplayTypeConfig,
    debounce(async (e) => {
      statusDisplayTypeConfig = e.target.value;
      await browser.storage.local.set({ statusDisplayType: statusDisplayTypeConfig });
    }, 300),
  );

  const statusDisplayTypeTipDisplay = (type) => {
    const container = document.createElement("span");
    container.className = "status-display";
    const icon = document.createElement("span");
    icon.appendChild(createSVG(svg_paths.musicNotePaths, { width: 14, height: 14, strokeWidth: 0 }));
    container.appendChild(icon);
    container.appendChild(document.createTextNode(i18n.t(`${displayTypes[type]}`)));

    return container;
  };

  const statusDisplayTypeTip = document.createElement("span");
  statusDisplayTypeTip.className = "settings-option-tip";
  statusDisplayTypeTip.textContent = "i";

  statusDisplayTypeTip.addEventListener("click", async () => {
    const body = h(
      "span",
      {},
      h("b", {}, i18n.t(displayTypes[0])),
      h("br", {}),
      i18n.t(`${displayTypes[0]}.tip`),
      statusDisplayTypeTipDisplay(0),
      h("br", {}),
      h("br", {}),
      h("b", {}, i18n.t(displayTypes[1])),
      h("br", {}),
      i18n.t(`${displayTypes[1]}.tip`),
      statusDisplayTypeTipDisplay(1),
      h("br", {}),
      h("br", {}),
      h("b", {}, i18n.t(displayTypes[2])),
      h("br", {}),
      i18n.t(`${displayTypes[2]}.tip`),
      statusDisplayTypeTipDisplay(2),
      h("br", {}),
      h("br", {}),
      h("b", {}, "SongName - Artist"),
      h("br", {}),
      "Uses a combined SongName - Artist short status while keeping Details and State separated.",
      h("br", {}),
      h("br", {}),
      h("b", {}, "Artist - SongName"),
      h("br", {}),
      "Uses a combined Artist - SongName short status while keeping Details and State separated.",
    );
    await showAlert(i18n.t("settings.statusDisplayType"), body, "tip");
  });

  statusDisplayTypeWrap.querySelector("label").appendChild(statusDisplayTypeTip);
  container.appendChild(statusDisplayTypeWrap);
}
