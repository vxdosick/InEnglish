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
            </div>
        </div>
        <button @click="nextCard" class="main__right">&#x279C;</button>
    </div>
    <div v-else class="main__container main__container-less650 container">
        <div class="main__slider">
            <div v-for="(el, i) in cards" :key="el._id" :class="['main__word', 'main__word-less650', {main__activeword: curentSlide == i}]">
                <h1 class="main__wordtotranslate">{{ el.word }}</h1>
                <p class="main__wordtranscription">{{ el.transcription }}</p>
                <h2 class="main__wordtranslated">{{ el.isTranslated ? el.translate : null }}</h2>
                <button @click="translateWord(el)" class="main__translate">Translate</button>
            </div>
        </div>
        <div>
            <button @click="prevCard" class="main__left">&#x279C;</button>
            <button @click="nextCard" class="main__right">&#x279C;</button>
        </div>
    </div>
</main>
</template>
<script>
import apiClient from '@/apiClient';
export default {
    name: "CardGameComponent",
    data() {
        return {
            cards: [],
            curentSlide: 0,
            windowWidth: window.innerWidth
        }
    },
    created() {
        window.addEventListener("resize", this.handleResize)
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
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
        }
    },
    async mounted() {
        const result = await apiClient.get("/api/card")
        console.log(result);
        this.cards = result.data
    }
}
</script>
<style lang="scss" scoped>
main {
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
            width: 400px;
            overflow: auto;
            .main__word {
                display: none;
                min-width: 400px;
                padding: 30px;
                border: 2px solid rgb(196, 132, 255);
                z-index: 1;
                background-color: white;
                border-radius: 20px;
                text-align: center;
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
    }
}
</style>