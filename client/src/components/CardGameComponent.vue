<template>
    <main>
        <img class="main__bg" src="images/card-bg.png" alt="background">
        <div v-if="windowWidth >= 650" class="main__container container">
            <button @click="prevCard" class="main__left">&#x279C;</button>
            <div class="main__slider">
                <div v-for="(el, i) in cards" :key="el._id" :class="['main__word', {main__activeword: curentSlide == i}]">
                    <h1 class="main__wordtotranslate">{{ el.word }}</h1>
                    <p class="main__wordtranscription">{{ el.transcription }}</p>
                    <h2 class="main__wordtranslated">{{ el.isTranslated ? el.translate : null }}</h2>
                    <button @click="translateWord(el)" class="main__translate">Translate</button>
                    <button @click="deleteWord(el, i)" class="main__sliderclose">&times;</button>
                    <!-- <div class="main__addoverflow" v-if="isDeleteCheck == true">
                        <div class="main__addcontainer">
                            <button @click="openDeleteCheck" class="main__addclose">&times;</button>
                            <h2 class="main__check">Delete that word?</h2>
                            <button @click="deleteWord(el, i)" class="main__delete">Delete</button>
                        </div>
                    </div> -->
                </div>
                <button @click="openAddWindow" class="main__add">+ Add New Word</button>
            </div>
            <button @click="nextCard" class="main__right">&#x279C;</button>
        </div>
        <div v-else class="main__container main__container-less650 container">
            <div class="main__slider main__slider-less650">
                <div v-for="(el, i) in cards" :key="el._id" :class="['main__word', 'main__word-less650', {main__activeword: curentSlide == i}]">
                    <h1 class="main__wordtotranslate">{{ el.word }}</h1>
                    <p class="main__wordtranscription">{{ el.transcription }}</p>
                    <h2 class="main__wordtranslated">{{ el.isTranslated ? el.translate : null }}</h2>
                    <button @click="translateWord(el)" class="main__translate">Translate</button>
                    <!-- <button @click="deleteWord(el, i)" class="main__sliderclose">&times;</button> -->
                    <!-- <div class="main__addoverflow" v-if="isDeleteCheck == true">
                        <div class="main__addcontainer">
                            <button @click="openDeleteCheck" class="main__addclose">&times;</button>
                            <h2 class="main__check">Delete that word?</h2>
                            <button @click="deleteWord(el, i)" class="main__delete">Delete</button>
                        </div>
                    </div> -->
                </div>
                <button @click="openAddWindow" class="main__add main__add-less650">+ Add New Word</button>
            </div>
            <div class="main__button">
                <button @click="prevCard" class="main__left">&#x279C;</button>
                <button @click="nextCard" class="main__right">&#x279C;</button>
            </div>
        </div>
        <div class="main__addoverflow" v-if="isAddOpen == true">
            <div class="main__addcontainer">
                <button @click="openAddWindow" class="main__addclose">&times;</button>
                <form @submit.prevent="addWord">
                    <label for="word">New word</label>
                    <input v-model="textWord" name="word" class="main__addword" type="text">
                    <label for="transcription">Word transcription</label>
                    <input v-model="textTranscription" name="transcription" class="main__addtranscription" type="text">
                    <label for="translate">Translate</label>
                    <input v-model="textTranslate" name="translate" class="main__addtranslate" type="text">
                    <button class="main__addsubmit" type="submit">Add New Word</button>
                </form>
            </div>
        </div>
    </main>
    </template>
    <script>
    //------------------------------
     import apiClient from '@/apiClient';
    //------------------------------
    // import axios from 'axios';
    export default {
        name: "CardGameComponent",
        data() {
            return {
                cards: [],
                curentSlide: 0,
                windowWidth: window.innerWidth,
                isAddOpen: false,
                textWord: "",
                textTranscription: "",
                textTranslate: "",
                isDeleteCheck: false,
            }
        },
        created() {
            window.addEventListener("resize", this.handleResize)
        },
        beforeUnmount() {
            window.removeEventListener('resize', this.handleResize);
        },
        methods: {
            async deleteWord(element, index) {
                try {
                    if(element._id) {
                        await apiClient.delete('/api/card/cardDeleteWord/' + element._id)
                        this.cards.splice(index, 1)
                        console.log(index);
                    } else {
                        console.log("Element Id is undefined" + element._id);
                    }
                } catch (err) {
                    console.log(err);
                }
            },
            async addWord() {
                const newWord = {
                    word: this.textWord,
                    transcription: this.textTranscription,
                    translate: this.textTranslate,
                    isTranslated: false
                }
                const result = await apiClient.post("/api/card/cardAddWord", newWord)
                newWord._id = result.data._id
                console.log(result);
                this.cards.unshift(newWord)
                this.textTranscription = ""
                this.textWord = ""
                this.textTranslate = ""
                this.openAddWindow()
            },
            handleResize() {
                this.windowWidth = window.innerWidth
            },
            translateWord(el) {
                el.isTranslated = !el.isTranslated
            },
            prevCard() {
                this.curentSlide = (this.curentSlide - 1 + this.cards.length) % this.cards.length
            },
            nextCard() {
                this.curentSlide = (this.curentSlide + 1) % this.cards.length
            },
            openAddWindow() {
                this.isAddOpen = !this.isAddOpen
            },
            openDeleteCheck() {
                this.isDeleteCheck = !this.isDeleteCheck
            }
        },
        async mounted() {
            const result = await apiClient.get("/api/card/cardElement")
            console.log(result);
            this.cards = result.data
        }
    }
    </script>
    <style lang="scss" scoped>
    main {
        .main__addoverflow {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background-color: rgba(156, 50, 255, 0.651);
            z-index: 1000;
            .main__addcontainer {
                max-width: 600px;
                background-color: white;
                border-radius: 20px;
                padding: 30px;
                position: absolute;
                top: 50%;
                left: 50%;
                border: 2px solid rgb(201, 96, 117);
                transform: translateX(-50%) translateY(-50%);
                @media (max-width: 450px) {
                    max-width: 300px;
                }
                .main__check {
                    font-size: 25px;
                    font-weight: 600;
                    margin-bottom: 20px;
                }
                .main__delete {
                    background-color: white;
                    padding: 5px 0px;
                    width: 100%;
                    color: crimson;
                    border: 1px solid crimson;
                    border-radius: 5px;
                    font-size: 18px;
                    transition: all 0.3s ease;
                    &:hover {
                        background-color: crimson;
                        color: white;
                    }
                }
                .main__addclose {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background-color: unset;
                    font-size: 25px;
                    color: rgb(156, 50, 255);
                    font-weight: 600;
                    transition: all 0.3s ease;
                    &:hover {
                        transform: scale(1.2);
                    }
                }
                form {
                    max-width: 450px;
                    padding: 20px 20px;
                    display: flex;
                    flex-direction: column;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    height: 100%;
                    label {
                        margin-bottom: 5px;
                        font-size: 18px;
                    }
                    input {
                        width: 300px;
                        border: 2px solid rgb(196, 132, 255);
                        margin-bottom: 20px;
                        border-radius: 5px;
                        padding: 3px 5px;
                        font-size: 17px;
                        font-weight: 500;
                        color: crimson;
                        @media (max-width: 450px) {
                            max-width: 196px;
                        }
                    }
                    .main__addsubmit {
                        background-color: white;
                        padding: 5px 0px;
                        color: crimson;
                        border: 1px solid crimson;
                        border-radius: 5px;
                        font-size: 18px;
                        margin-top: auto;
                        transition: all 0.3s ease;
                        margin-top: 50px;
                        &:hover {
                            background-color: crimson;
                            color: white;
                        }
                    }
                }
            }
        }
        color: rgb(156, 50, 255);
        height: 100vh;
        position: relative;
        .main__bg {
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: absolute;
            z-index: -1;
        }
        .main__container-less650 {
            flex-direction: column;
        }
        .main__container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            gap: 50px;
            .main__left {
                transform: rotateY(-180deg);
            }
            .main__left, .main__right {
                font-size: 20px;
                color: rgb(156, 50, 255);
                padding: 5px 15px;
                background-color: white;
                border: 2px solid rgb(196, 132, 255);
                border-radius: 10px;
            }
            .main__slider {
                display: flex;
                overflow: auto;
                flex-direction: column;
                .main__add {
                    margin-top: 20px;
                    border-radius: 20px;
                    padding: 10px;
                    background-color: white;
                    border: 2px solid rgb(196, 132, 255);
                    color: rgb(156, 50, 255);
                    font-size: 20px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    &:hover {
                        color: white;
                        background-color: rgb(196, 132, 255);
                    }
                }
                .main__add-less650 {
                    width: 200px;
                    margin: 0 auto;
                    margin-top: 20px;
                }
                .main__word {
                    display: none;
                    min-width: 400px;
                    padding: 30px;
                    border: 2px solid rgb(196, 132, 255);
                    z-index: 1;
                    background-color: white;
                    border-radius: 20px;
                    text-align: center;
                    position: relative;
                    .main__wordtotranslate {
                        margin-bottom: 10px;
                        font-size: 30px;
                        font-weight: 600;
                        color: black;
                    }
                    .main__wordtranscription {
                        font-size: 22px;
                        font-weight: 300;
                    }
                    .main__wordtranslated {
                        font-size: 28px;
                        padding: 50px 0px;
                    }
                    .main__sliderclose {
                        position: absolute;
                        top: 5px;
                        right: 10px;
                        background-color: unset;
                        font-size: 25px;
                        color: rgb(156, 50, 255);
                        font-weight: 600;
                        transition: all 0.3s ease;
                        &:hover {
                            transform: scale(1.2);
                        }
    
                    }
                    .main__translate {
                        background-color: white;
                        font-size: 20px;
                        display: block;
                        margin: 0 auto;
                        border: 2px solid rgb(196, 132, 255);
                        border-radius: 10px;
                        padding: 5px 20px;
                    }
                }
                .main__word-less650 {
                    min-width: 200px;
                    margin: 0 auto
                }
                .main__activeword {
                    display: block;
                }
            }
            .main__button {
                    display: flex;
                    align-items: center;
                    gap: 50px;
                }
            .main__add-less650 {
                width: 300px;
            }
        }
    }
    </style>