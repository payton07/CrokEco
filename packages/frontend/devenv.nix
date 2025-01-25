{ pkgs, lib, config, inputs, ... }:

{
  # https://devenv.sh/basics/
  env.GREET = "projet-co2-frontend";

  # https://devenv.sh/packages/

  # https://devenv.sh/languages/
  # languages.rust.enable = true;

  # https://devenv.sh/processes/
  # processes.cargo-watch.exec = "cargo-watch";

  # https://devenv.sh/services/
  # services.postgres.enable = true;

  # https://devenv.sh/scripts/
  scripts.hello.exec = ''
    echo hello from $GREET
  '';

  enterShell = ''
    hello
  '';

  # https://devenv.sh/tasks/
  # tasks = {
  #   "myproj:setup".exec = "mytool build";
  #   "devenv:enterShell".after = [ "myproj:setup" ];
  # };

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
    };
    typescript.enable = true;
  };

  env.ANDROID_HOME="/home/$USER/Android/Sdk";

  scripts = {
    build.exec = ''
      npx expo prebuild
      cd android
      ./gradlew app:assembleRelease
    '';
  };

  git-hooks.hooks = {
    prettier.enable = true;
    eslint.enable = true;
  };

}
