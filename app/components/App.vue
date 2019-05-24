<template>
    <Dashboard v-if="dashboard" />
    <Home v-else-if="home" />
</template>

<script>
    import Home from "./Home";
    import Dashboard from "./Dashboard";
    import * as appSettings from "tns-core-modules/application-settings";
    export default {
        name: "App",
        components: {
            Home,
            Dashboard
        },
        data() {
            return {
                home: false,
                dashboard: false
            };
        },
        created() {
            const username = appSettings.getString("username");
            console.log("Mounted UserName APP: --- ", username);
            if (username) {
                this.dashboard = true;
            }
            this.home = true;
        }
    };
</script>