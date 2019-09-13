<template>
    <Page>
        <ActionBar title="Prijavi problem" />
        <StackLayout>
            <RadDataForm :source="issue" />
            <Button text="Slikaj" @tap="takePicture" />
            <Button text="Izaberi iz telefona" @tap="selectPicture" />
            <WrapLayout>
                <Image v-for="img in images" :src="img.src" width="75" height="75" />
            </WrapLayout>


            <StackLayout>
                <Button text="Aktiviraj lokaciju" @tap="enableLocationServices"
                    :visibility="currentGeoLocation.latitude ? 'collapsed' : 'visible'" />
                <StackLayout :visibility="currentGeoLocation.latitude ? 'visible' : 'collapsed'">
                    <Label :text="'Latitude: ' + currentGeoLocation.latitude" />
                    <Label :text="'Longitude: ' + currentGeoLocation.longitude" />
                    <Label :text="'Altitude: ' + currentGeoLocation.altitude" />
                    <Label :text="'Direction: ' + currentGeoLocation.direction" />
                    <Label :text="'Address: ' + address" />
                </StackLayout>
            </StackLayout>
            <Button text="Prijavi" @tap="sendToServer" />

            <WrapLayout v-if="errors.length">
                <Label v-for="error in errors" :text="error" width="250" />
            </WrapLayout>
        </StackLayout>
    </Page>
</template>

<script>
    const geoLocation = require("nativescript-geolocation");

    import Vue from "nativescript-vue";
    import RadDataForm from "nativescript-ui-dataform/vue";
    Vue.use(RadDataForm);
    import * as appSettings from "tns-core-modules/application-settings";
    import * as camera from "nativescript-camera";
    import * as imagepicker from "nativescript-imagepicker";
    import * as bgdHttp from "nativescript-background-http";
    import {
        alert,
        prompt
    } from "tns-core-modules/ui/dialogs";
    import {
        request,
        getFile,
        getImage,
        getJSON,
        getString
    } from "tns-core-modules/http";
    import {
        Image
    } from "tns-core-modules/ui/image";
    import Dashboard from "./Dashboard";

    export default {
        props: {
            problem: {
                type: Number
            }
        },
        data() {
            return {
                currentGeoLocation: {
                    latitude: null,
                    longitude: null,
                    altitude: null,
                    direction: null
                },
                address: null,
                issue: {
                    naslov: "",
                    opis: ""
                },
                problem: "",
                images: [],
                paths: [],
                errors: [],
                calls: 0
            };
        },
        methods: {
            enableLocationServices: function() {
                geoLocation.isEnabled().then(enabled => {
                    if (!enabled) {
                        geoLocation
                            .enableLocationRequest()
                            .then(() => this.showLocation());
                    } else {
                        this.showLocation();
                    }
                });
            },
            showLocation: function() {
                geoLocation.watchLocation(
                    location => {
                        this.currentGeoLocation = location;
                        this.convertToAddress(
                            this.currentGeoLocation.latitude,
                            this.currentGeoLocation.longitude
                        );
                    },
                    error => {
                        alert(error);
                    }, {
                        desiredAccuracy: 3,
                        updateDistance: 10,
                        minimumUpdateTime: 1000 * 1
                    }
                );
            },
            convertToAddress(lat, lon) {
                this.calls++;
                if (this.calls > 1) {
                    return null;
                }
                const url =
                    "https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?app_id=SAPlWPTNPcXDkQviFBds&app_code=JiNghJE0jjXsy5Al0hRPdA&language=hr-HR&mode=retrieveAddresses&prox=" +
                    lat +
                    "," +
                    lon;
                getString(url).then(response => {
                    const obj = JSON.parse(response);
                    this.address =
                        obj.Response.View[0].Result[0].Location.Address
                        .Label;
                });
            },
            selectPicture() {
                if (this.paths.length === 3) {
                    this.errors.push("3 Fotografije su dozvoljene");
                    return;
                }
                let context = imagepicker.create({
                    mode: "multiple"
                });

                context
                    .authorize()
                    .then(function() {
                        return context.present();
                    })
                    .then(selection => {
                        selection.forEach(selected => {
                            let img = new Image();
                            img.src = selected;
                            this.images.push(img);
                            this.paths.push(selected._android);
                        });
                    })
                    .catch(function(e) {
                        console.log("error in selectPicture", e);
                    });
            },
            takePicture() {
                if (this.paths.length === 3) {
                    this.errors.push("3 Fotografije su dozvoljene");
                    return;
                }
                camera
                    .requestPermissions()
                    .then(() => {
                        camera
                            .takePicture({
                                width: 300,
                                height: 300,
                                keepAspectRatio: true,
                                saveToGallery: false
                            })
                            .then(imageAsset => {
                                let img = new Image();
                                img.src = imageAsset;
                                this.images.push(img);
                                this.paths.push(imageAsset._android);
                            })
                            .catch(e => {
                                console.log("error:", e);
                            });
                    })
                    .catch(e => {
                        console.log("Error requesting permission");
                    });
            },
            sendToServer() {
                if (!this.issue.naslov) {
                    this.errors.push("Morate uneti naslov");
                    return;
                }
                if (this.paths === undefined || this.paths.length == 0) {
                    this.errors.push("Dodajte bar jednu fotografiju");
                    return;
                }
                if (this.address == null) {
                    this.errors.push("Aktivirajte lokaciju");
                    return;
                }
                const session = bgdHttp.session("image-upload");
                const uuid = Math.random()
                    .toString(14)
                    .substring(2);
                const request = {
                    url: "https://valjevo.zelenigrad.rs/wp-json/wcra/v1/posts/?secret_key=RBB9SUs6EUNZPI5mUg5KkH1huYNLkwyj",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/octet-stream"
                    },
                    androidDisplayNotificationProgress: true
                };

                let params = [{
                        name: "uuid",
                        value: uuid
                    },
                    {
                        name: "username",
                        value: appSettings.getString("username")
                    },
                    {
                        name: "city",
                        value: appSettings.getNumber("city").toString()
                    },
                    {
                        name: "postContent",
                        value: this.issue.opis
                    },
                    {
                        name: "postTitle",
                        value: this.issue.naslov
                    },
                    {
                        name: "postName",
                        value: this.issue.naslov
                    },
                    {
                        name: "category",
                        value: this.problem.toString()
                    },
                    { name: "address", value: this.address },
                    { name: "latitude", value: this.currentGeoLocation.latitude.toString() },
                    { name: "longitude", value: this.currentGeoLocation.longitude.toString() }
                ];

                this.paths.forEach((value, index) => {
                    params.push({
                        name: "fileToUpload",
                        filename: value,
                        mimeType: "image/jpeg"
                    });
                    var task = session.multipartUpload(params,
                        request);

                    this.$navigateTo(Dashboard);
                    alert({
                        title: "Zeleni Grad",
                        message: "Vaša prijava je uspešno prosledjena. Nakon odobravanja administratora prijava će biti prosledjena nadležnim institucijama. Dalje rešavanje Vaše prijave možete pratiti na web portalu www.zelenigrad.rs. u okviru izabrane kategorije problema. Sve Vaše prijave možete pronaći u sekciji Moje prijave u okviru padajućeg menija. Hvala Vam na izdvojenom vremenu.",
                        okButtonText: "Ok "
                    });
                });
            }
        }
    };
</script>
