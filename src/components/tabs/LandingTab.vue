<template>
    <BaseTab tab-name="landing">
        <div class="content_wrapper">
            <div class="content_top">
                <div class="logowrapper">
                    <img src="/images/echo_corp_logo.png" alt="" />
                    <div v-html="$t('defaultWelcomeIntro')"></div>
                </div>
            </div>
        </div>
    </BaseTab>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import BaseTab from "./BaseTab.vue";
import GUI from "../../js/gui";

export default defineComponent({
    name: "LandingTab",
    components: {
        BaseTab,
    },
    setup() {
        onMounted(() => {
            GUI.content_ready();
        });
    },
});
</script>

<style lang="less">
.tab-landing {
    display: flex;
    min-height: 100%;
    background: var(--surface-100) url(../../images/pattern_light.png);
    background-size: 300px;
    overflow: hidden;
}
</style>

<style scoped lang="less">
.content_wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 24px 16px;
    min-height: 100%;
    overflow-y: auto;
}

.content_top {
    width: 100%;
    max-width: 1200px;
    padding: 0;
    margin: 0;
}

.logowrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    margin-top: 0;
    color: var(--text);
    font-size: 14px;
    font-weight: 300;
    text-align: center;
    gap: 14px;

    > div {
        text-align: center;
        max-width: min(92vw, 1120px);
        margin: 0 auto;
        line-height: 1.45;
        font-size: clamp(16px, 1.5vw, 33px);
    }

    img {
        width: min(70vw, 680px);
        margin: 0;
        height: auto;
    }

    span {
        font-size: 22px;
        font-weight: 300;
    }
}

.logowrapper > div:deep(p) {
    margin: 0;
    text-align: center;
}
</style>
