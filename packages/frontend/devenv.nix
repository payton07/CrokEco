{ pkgs, lib, config, inputs, ... }:

{
  # https://devenv.sh/basics/
  env.GREET = "projet-co2-frontend";

  enterShell = ''
    echo hello from $GREET
  '';

  # https://devenv.sh/tests/
  enterTest = ''
    echo "Running tests"
  '';

  # https://devenv.sh/pre-commit-hooks/
  # pre-commit.hooks.shellcheck.enable = true;

  # See full reference at https://devenv.sh/reference/options/
  packages = [
    pkgs.chromium
    pkgs.eslint
    pkgs.nodePackages.prettier
  ];

  languages = {
    java = {
      enable = true;
      gradle.enable = true;
      jdk.package = pkgs.jdk17;
    };
    javascript = {
      enable = true;
      npm.enable = true;
      package = pkgs.nodejs_latest;
    };
    typescript.enable = true;
  };


  scripts = {
    build.exec = ''
      npx expo prebuild
      cd android
      ./gradlew app:assembleRelease
    '';
  };

  git-hooks.hooks = {
    prettier.enable = true;
    # eslint.enable = true;
  };

}
