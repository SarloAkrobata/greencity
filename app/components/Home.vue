<template>
    <Page class="page" actionBarHidden="true">
        <ScrollView>
            <AbsoluteLayout width="100%" height="100%">

                <FlexboxLayout class="logo" flexDirection="column" height="100%"
                    width="100%" id="app">

                    <StackLayout class="home-panel" flexGrow="7" id="view">
                        <ListPicker :items="cities" v-model="selectedListPickerIndex" />
                        <TextField v-model="username" hint="Email" style="placeholder-color:lightgray; font-size:14px; text-align:center;" />
                        <Button class="loginBtn" text="Prijavi se" @tap="login" />
                        <Label v-if="errors.length" text="Uneli ste neispravan email ili niste odabrali grad"
                            style="font-size:12px;" />
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
                errors: [],

                cities: ["Izaberite grad", "Valjevo"],
                selectedListPickerIndex: 0
            };
        },

        methods: {
            onItemTap: function(args) {
                console.log("Item with index: " + args.index + " tapped");
            },

            login() {
                if (!this.validEmail(this.username)) {
                    this.errors.push("username");
                    return;
                }
                if (this.selectedListPickerIndex === 0) {
                    this.errors.push("city");
                    return;
                }
                const setUsername = appSettings.setString(
                    "username",
                    this.username
                );
                const city = appSettings.setNumber(
                    "city",
                    this.selectedListPickerIndex
                );
                const getUsername = appSettings.getString("username");

                const a = request({
                    url: "https://www.zelenigrad.rs/wp-json/wcra/v1/users/?secret_key=2WDts4uni6cNjznX4RRb6TcxceuSUQUs",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    content: JSON.stringify({
                        username: getUsername,
                        city: this.selectedListPickerIndex
                    })
                });

                console.log("SetUsername: ------ ", getUsername);
                this.$navigateTo(Dashboard, {
                    props: {
                        username: getUsername,
                        city: this.selectedListPickerIndex
                    }
                });
            },
            validEmail: function(email) {
                var re =
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
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
        margin-top: 15%;
        /* vertical-align: top; */
        font-size: 20;
        padding-left: 20px;
        padding-right: 20px;
        color: lightgray;
    }

    .description-label {
        margin-bottom: 15;
    }

    .logo {
        background-image: url("~/assets/images/choose_city.png");
        background-repeat: no-repeat;
        background-size: cover;
    }

    .loginBtn {
        color: #5e6a7d;
    }
</style>