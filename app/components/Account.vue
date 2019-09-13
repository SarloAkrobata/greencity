<template>
    <Page>
        <ActionBar title="Moj nalog">
        </ActionBar>

        <TabView :selectedIndex="selectedIndex" @selectedIndexChange="indexChange"
            androidSelectedTabHighlightColor="#b0e309" tabBackgroundColor="#5e6a7d"
            selectedTabTextColor="white" tabTextColor="white">
            <TabViewItem title="Moje prijave">

                <ListView class="list-group" for="post in posts" style="height:1250px">
                    <v-template>
                        <FlexboxLayout flexDirection="row" class="list-group-item"
                            @tap="goToUrl(post.ID)">
                            <Label :text="post.post_title + ' Status: ' + post.post_status" class="list-group-item-heading"
                                style="width: 60%" />
                        </FlexboxLayout>
                    </v-template>
                </ListView>
            </TabViewItem>
            <TabViewItem title="Odjava">


                <WrapLayout orientation="horizontal" width="90%" height="300"
                    backgroundColor="white">
                    <Button text="Odjavite se iz aplikacije" @tap="logout"
                        class="odjava" />
                </WrapLayout>


            </TabViewItem>
        </TabView>
    </Page>
</template>

<script>
    import Home from "./Home";
    import * as appSettings from "tns-core-modules/application-settings";
    import {
        request,
        getFile,
        getImage,
        getJSON,
        getString
    } from "tns-core-modules/http";
    import * as http from "http";
    import * as utils from "tns-core-modules/utils/utils";
    export default {
        methods: {
            onItemTap: function(args) {
                console.log("Item with index: " + args.index + " tapped");
            },
            logout() {
                appSettings.clear();
                this.$navigateTo(Home, {
                    clearHistory: true
                });
            },
            goToUrl(ID) {
                utils.openUrl("https://valjevo.zelenigrad.rs/?p=" + ID);
            }
        },
        mounted() {
            const username = appSettings.getString("username");
            http.request({
                url: "https://valjevo.zelenigrad.rs/wp-json/wcra/v1/users_posts/?secret_key=RBB9SUs6EUNZPI5mUg5KkH1huYNLkwyj",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                content: JSON.stringify({
                    username: username
                })
            }).then(
                response => {
                    const result = response.content.toJSON();
                    result.data.forEach(post => {
                        this.posts.push(post);
                    });
                }
            );
        },

        data() {
            return {
                posts: []
            };
        }
    };
</script>

<style>
    .odjava {}
</style>
