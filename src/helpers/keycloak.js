import Keycloak from "keycloak-js";

const keycloakSetting = new Keycloak({
  url: "http://localhost:8080/auth",
  realm: "freelance-exchange",
  clientId: "freelance-web",
});

export default keycloakSetting;
