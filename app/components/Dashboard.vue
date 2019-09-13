<template>
    <Page>

        <ActionBar title="Prijava problema">
            <ActionItem class="">
                <Image src="~/assets/images/menu.png" id="menu" @tap="goToMenu" />
            </ActionItem>
        </ActionBar>
        <StackLayout>

            <TabView :selectedIndex="selectedIndex" @selectedIndexChange="indexChange"
                androidSelectedTabHighlightColor="#b0e309" tabBackgroundColor="#5e6a7d"
                selectedTabTextColor="white" tabTextColor="white">
                <TabViewItem title="Prijava">
                    <!-- Prosledjen username sa Home -->
                    <!-- <Label :text="username" class="title bold" /> -->
                    <ScrollView id="scroll" orientation="vertical" isEnabled="true"
                        width="100%" height="1450" backgroundColor="white">

                        <WrapLayout width="100%" height="1450"
                            backgroundColor="white">

                            <Image src="~/assets/images/problems/1.png" class="problem"
                                width="45%" @tap="takePicture" problem="1" />
                            <Image src="~/assets/images/problems/2.png" class="problem"
                                width="45%" @tap="takePicture" problem="2" />
                            <Image src="~/assets/images/problems/3.png" class="problem"
                                width="45%" @tap="takePicture" problem="3" />
                            <Image src="~/assets/images/problems/4.png" class="problem"
                                width="45%" @tap="takePicture" problem="4" />
                            <Image src="~/assets/images/problems/5.png" class="problem"
                                width="45%" @tap="takePicture" problem="5" />
                            <Image src="~/assets/images/problems/6.png" class="problem"
                                width="45%" @tap="takePicture" problem="6" />
                            <Image src="~/assets/images/problems/7.png" class="problem"
                                width="45%" @tap="takePicture" problem="7" />
                            <Image src="~/assets/images/problems/8.png" class="problem"
                                width="45%" @tap="takePicture" problem="8" />
                            <Image src="~/assets/images/problems/9.png" class="problem"
                                width="45%" @tap="takePicture" problem="9" />
                            <Image src="~/assets/images/problems/10.png"
                                class="problem" width="45%" @tap="takePicture"
                                problem="10" />
                        </WrapLayout>
                    </ScrollView>
                </TabViewItem>
                <TabViewItem title="Info Grad">
                    <TextView editable="false">
                        <FormattedString>
                            <Span text="Valjevo je jedan od retkih gradova koji ima dve čaršije. I to jednu naspram druge, kao simboličan kontrast Istoka i Zapada
i njihovog vekovnog sudaranja baš na teritoriji Srbije. Deli ih reka Kolubara.

Uz njenu desnu obalu se prostire Tešnjar, stara čašija orijentlnog stila. Male zanatske radnjice, niske kućice i kaldrma čine da Tešnjar izgleda kao da je zaspao u
doba turskih paša i srpskih ustanika. Sve dok ih avgustom ne probude “Tešnjarske večeri” u kojima ova čaršija u nekoliko
dana promeni mnoga lica umetnosti, a najviše pozorišne i filmske.

 Nasuprot orijentalnom Tešnjaru, Knez Miloš Obrenović je
s početka 19. veka naredio da se na levoj obali Kolubare napravi ulica tj. četvrt koja će biti uređena na ondašnji evropski
način. Podizanjem trgovačkih i ugostiteljskih objekata, zanatskih radnji i hotela ova ulica je vremenom postajala jezgro
gradskog života, ali kao i Tešnjar, pozornica za mnoga kulturno-umetnička dešavanja i ambijent za snimanje filmova i serija." />
                        </FormattedString>
                    </TextView>
                </TabViewItem>
                <TabViewItem title="O aplikaciji">
                    <TextView editable="false">
                        <FormattedString>
                            <Span text="Aplikacija predstavlja servis za građanstvo putem kog se na jednostavan način mogu prijaviti komunalni problemi u gradu i" />
                            <Span text=" na taj način pomoći u brzini rešavanja istih. Na ovaj način svi dajemo svoj doprinos za čistiju i lepšu okolinu u kojoj živimo." />
                            <Span text="

" />
                            <Span text="Nakon izbora grada i prijave na sistem, aplikacija vam daje mogućnost prijave komunalnih problema u više kategorija. Izborom" />
                            <Span text=" kategorije dovoljno je da slikate problem, da ga ukratko opišete i zajedno sa geolokacijom koja se preuzme sa uređaja pošaljete," />
                            <Span text=" i sve to u tri koraka." />
                            <Span text="

" />
                            <Span text="Jednostavnost, brzina i transparentnost su glavne odlike ove aplikacije, jer kroz jednostavan način prijavljivanja komunalnih" />
                            <Span text=" problema, nadležne službe dobijaju brzu, jasnu i lako proverljivu informaciju koja je dokumentovana slikom i tačnom lokacijom." />

                        </FormattedString>
                    </TextView>
                </TabViewItem>
            </TabView>

        </StackLayout>
    </Page>
</template>

<script>
    import Home from "./Home";
    import Camera from "./Camera";
    import Account from "./Account";
    import * as appSettings from "tns-core-modules/application-settings";
    export default {
        props: {
            username: {
                type: String
            },
            problem: {
                type: Number
            }
        },
        data() {
            return {
                problem: ""
            };
        },
        methods: {
            goToMenu() {
                this.$navigateTo(Account);
            },

            takePicture(args) {
                this.$navigateTo(Camera, {
                    props: {
                        problem: args.object.problem
                    }
                });
            }
        }
    };
</script>

<style>
    .problem {
        margin-top: 0.6%;
        margin-left: 3%;
    }

    ActionBar {
        background-color: #b0e309;
        color: #5e6a7d;
    }

    .title {
        horizontal-align: left;
    }

    #menu {
        width: 130px;
        height: 130px;
        background-repeat: no-repeat;
        color: white;
        horizontal-align: right;
    }
</style>
