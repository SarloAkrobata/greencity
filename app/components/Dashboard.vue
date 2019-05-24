<template>
    <Page>

        <ActionBar title="Prijavi problem">
            <ActionItem @tap="takePicture" ios.systemIcon="15" ios.position="left"
                android.systemIcon="ic_menu_camera" android.position="actionBar"
                text="Prijavi"></ActionItem>
        </ActionBar>
        <StackLayout>

            <TabView :selectedIndex="selectedIndex" @selectedIndexChange="indexChange">
                <TabViewItem title="Novosti">
                    <!-- Prosledjen username sa Home -->
                    <!-- <Label :text="username" class="title bold" /> -->

                    <ListView class="list-group" for="country in countries"
                        @itemTap="onItemTap" style="height:1250px">
                        <v-template>
                            <FlexboxLayout flexDirection="row" class="list-group-item">
                                <Image :src="country.imageSrc" class="thumb img-circle" />
                                <Label :text="country.name" class="list-group-item-heading"
                                    style="width: 60%" />
                            </FlexboxLayout>
                        </v-template>
                    </ListView>
                </TabViewItem>
                <TabViewItem title="Prijavljeno">
                    <Button text="Odjava" @tap="logout" />
                </TabViewItem>
                <TabViewItem title="Moje prijave">
                    <Label :text="text" class="title bold" />
                </TabViewItem>
            </TabView>

        </StackLayout>
    </Page>
</template>

<script>
    import Home from "./Home";
    import Camera from "./Camera";
    import * as appSettings from "tns-core-modules/application-settings";
    export default {
        props: {
            username: {
                type: String
            }
        },
        data() {
            return {
                countries: [{
                        name: "Kucici po ulicama kaku",
                        imageSrc: "https://www.doghealth.com/images/dog_scratching_doghealth.jpg"
                    },
                    {
                        name: "Najvaznija novost",
                        imageSrc: "https://play.nativescript.org/dist/assets/img/flags/be.png"
                    },
                    {
                        name: "Kucici po ulicama kaku",
                        imageSrc: "https://www.doghealth.com/images/dog_scratching_doghealth.jpg"
                    },
                    {
                        name: "Najvaznija novost",
                        imageSrc: "https://play.nativescript.org/dist/assets/img/flags/be.png"
                    }
                ]
            };
        },
        methods: {
            onItemTap: function(args) {},

            takePicture() {
                console.log("SLikaj");
                this.$navigateTo(Camera);
            },

            logout() {
                appSettings.clear();
                this.$navigateTo(Home, {
                    clearHistory: true
                });
            }
        }
    };
</script>

<style>
</style>