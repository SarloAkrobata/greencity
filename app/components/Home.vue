<template>
    <Page class="page" actionBarHidden="true">
        <ScrollView>
            <AbsoluteLayout width="100%" height="100%">
                <FlexboxLayout width="100%" height="100%" justifyContent="center"
                    alignItems="center">
                    <Image src="~/assets/images/logo.png" class="logo" width="350"
                        height="350" :marginLeft="(width - 250)" :marginTop="-200" />
                </FlexboxLayout>

                <FlexboxLayout flexDirection="column" height="100%" width="100%"
                    id="app">

                    <StackLayout class="home-panel" flexGrow="7" id="view">

                        <ListPicker :items="cities" v-model="selectedListPickerIndex" />
                        <TextField v-model="username" hint="Email ili broj telefona" />
                        <Button text="Prijavi se" @tap="login" />
                    </StackLayout>
                </FlexboxLayout>
            </AbsoluteLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import Dashboard from "./Dashboard";
    import Vue from "nativescript-vue";
    import * as appSettings from "tns-core-modules/application-settings";
    import {
        request,
        getFile,
        getImage,
        getJSON,
        getString
    } from "tns-core-modules/http";

    export default {
        props: {
            username: {
                type: String
            }
        },
        data() {
            return {
                username: "",
                loggedIn: "",

                cities: ["Izaberite grad", "Beograd", "Valjevo", "Sabac"],
                selectedListPickerIndex: 0
            };
        },

        methods: {
            login() {
                const setUsername = appSettings.setString(
                    "username",
                    this.username
                );
                const getUsername = appSettings.getString("username");

                const a = request({
                    url: "https://corecms.io/wp-json/wcra/v1/users/?secret_key=hrPFWlR47a09cROeHOrsV8AD0aOxvojN",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    content: JSON.stringify({
                        username: getUsername,
                        grad: this.selectedListPickerIndex
                    })
                });

                console.log("SetUsername: ------ ", getUsername);
                this.$navigateTo(Dashboard, {
                    props: {
                        username: getUsername
                    }
                });
            }
        },

        mounted() {
            const username = appSettings.getString("username");
            console.log("Mounted UserName Home: --- ", username);
            if (username) {
                setTimeout(() => {
                    this.$navigateTo(Dashboard, {
                        props: {
                            username: username
                        }
                    });
                }, 100);
            }
        }
    };
</script>

<style scoped>
    .home-panel {
        vertical-align: center;
        font-size: 20;
        margin: 15;
    }

    .description-label {
        margin-bottom: 15;
    }
</style>