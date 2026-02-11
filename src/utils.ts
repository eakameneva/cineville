export const formatLanguages = (languages: string[] = []) => {
  const displayNames = new Intl.DisplayNames(["en"], {
    type: "language",
  });

  return languages
    .map((lang) => {
      const baseLang = lang.split("-")[0];
      return displayNames.of(baseLang) ?? lang;
    })
    .join(", ");
};
