<template>
    <div class="main-cnt">
        <div class="page-component__scroll el-scrollbar">
            <div class="el-scrollbar__wrap" style="margin-bottom: -17px; margin-right: -17px;">
                <div class="el-scrollbar__view" style="position: relative;">
                    <div class="page-container page-component">
                        <div class="page-component__content">
                            <section class="content">
                                <transition name="move" mode="out-in">
                                    <router-view></router-view>
                                </transition>
                            </section>
                        </div>
                        <div class="page-component-up">
                            <i class="el-icon-caret-top"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
