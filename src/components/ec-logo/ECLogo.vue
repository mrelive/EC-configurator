<template>
    <div class="ec_logo">
        <img src="/src/images/ec-logo.svg" alt="EC Logo" class="ec_logo_mark" />
        <div class="ec_logo_text">
            <span>{{ $t("versionLabelConfigurator") }}: {{ configuratorVersion }}</span>
            <span v-if="firmwareVersion && firmwareId"
                >{{ $t("versionLabelFirmware") }}: {{ firmwareVersion }} {{ firmwareId }}</span
            >
            <span v-if="hardwareId">{{ $t("versionLabelTarget") }}: {{ hardwareId }}</span>
        </div>
    </div>
</template>
<script>
export default {
    name: "ECLogo",
    props: {
        configuratorVersion: { type: String, required: true },
        firmwareVersion: { type: String, default: "" },
        firmwareId: { type: String, default: "" },
        hardwareId: { type: String, default: "" },
    },
};
</script>
<style>
.ec_logo {
    height: 70px;
    width: 240px;
    display: flex;
    align-items: center;
    position: relative;
    font-family: var(--font-family, "Open Sans", sans-serif);
}
.ec_logo_mark {
    height: 50px;
    width: 50px;
    object-fit: contain;
    filter: drop-shadow(0 0 8px rgba(0, 230, 230, 0.6));
}
.ec_logo_text {
    display: flex;
    flex-direction: column;
    font-size: 11px;
    margin-left: 8px;
    color: var(--text);
}
.tab_container .ec_logo {
    display: none;
}
@media all and (max-width: 575px) {
    .ec_logo {
        height: 24px;
        width: 150px;
    }
    .ec_logo_text {
        display: none !important;
    }
    .tab_container .ec_logo {
        display: flex;
        height: 120px;
        width: auto;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    }
    .tab_container .ec_logo_text {
        display: flex !important;
        margin-left: 0;
        margin-top: 8px;
    }
}
@media all and (min-width: 1125px) {
    .ec_logo {
        width: 340px;
    }
    .ec_logo_text {
        font-size: inherit;
        position: relative;
    }
}
</style>
