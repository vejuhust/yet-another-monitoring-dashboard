var _profile;

function renderMainPage(tag_env, tag_part) {
  _profile = extractEnvPartProfile(tag_env, tag_part);
  if (updateContentTitleDesc(_profile)) {
    updateWebpageTitle(_profile);
    addNewSubBoxInStatusBox(_profile);
  }
}
