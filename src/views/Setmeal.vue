<template>
  <div class="wrapper">
        <header>
            <i class="fa fa-angle-left" onclick="history.go(-1)"></i>
            <p>用户体检预约</p>
            <div></div>
        </header>
        <div class="top-ban"></div>
        <!-- 判断是个人预约还是家属预约 -->
       <div v-if="!returnFlag()">
        <ul class="setmeal">
            <!-- 男士套餐 -->
            <li v-for="(setmeal,index) in setmealArrMan" :key="setmeal.smId">
                <div class="item">
                    <div class="item-left" @click="toSelectDate(setmeal.smId)">
                        <h3>男士套餐</h3>
                        <p>{{setmeal.name}}</p>
                    </div>
                    <div class="item-right" @click="isShowEventMan(index)">
                        <p>详情</p>
                        <i class="fa fa-angle-down"></i>
                    </div>
                </div>
                <div class="item-content" v-if="setmeal.isShow">
                    <table>
                        <tr>
                            <th>检查项目</th>
                            <th>检查内容</th>
                            <th>检查意义</th>
                        </tr>
                        <tr v-for="setmealDetailed in setmeal.sdList" :key="setmealDetailed.sdId">
                            <td>{{setmealDetailed.checkItem.ciName}}</td>
                            <td>{{setmealDetailed.checkItem.ciContent}}</td>
                            <td>{{setmealDetailed.checkItem.meaning}}</td>
                        </tr>
                    </table>
                </div>
            </li>
            <!-- 女士套餐 -->
            <li v-for="(setmeal,index) in setmealArrWoman" :key="setmeal.smId">
                <div class="item">
                    <div class="item-left" @click="toSelectDate(setmeal.smId)">
                        <h3>女士套餐'</h3>
                        <p>{{setmeal.name}}</p>
                    </div>
                    <div class="item-right" @click="isShowEventWoman(index)">
                        <p>详情</p>
                        <i class="fa fa-angle-down"></i>
                    </div>
                </div>
                <div class="item-content" v-if="setmeal.isShow">
                    <table>
                        <tr>
                            <th>检查项目</th>
                            <th>检查内容</th>
                            <th>检查意义</th>
                        </tr>
                        <tr v-for="setmealDetailed in setmeal.sdList" :key="setmealDetailed.sdId">
                            <td>{{setmealDetailed.checkItem.ciName}}</td>
                            <td>{{setmealDetailed.checkItem.ciContent}}</td>
                            <td>{{setmealDetailed.checkItem.meaning}}</td>
                        </tr>
                    </table>
                </div>
            </li>
        </ul>
       </div>
        <div v-else>
            <ul class="setmeal">
            <li v-for="(setmeal,index) in setmealArr" :key="setmeal.smId">
                <div class="item">
                    <div class="item-left" @click="toSelectDate(setmeal.smId)">
                        <h3>女士套餐</h3>
                        <p>{{setmeal.name}}</p>
                    </div>
                    <div class="item-right" @click="isShowEventWoman(index)">
                        <p>详情</p>
                        <i class="fa fa-angle-down"></i>
                    </div>
                </div>
                <div class="item-content" v-if="setmeal.isShow">
                    <table>
                        <tr>
                            <th>检查项目</th>
                            <th>检查内容</th>
                            <th>检查意义</th>
                        </tr>
                        <tr v-for="setmealDetailed in setmeal.sdList" :key="setmealDetailed.sdId">
                            <td>{{setmealDetailed.checkItem.ciName}}</td>
                            <td>{{setmealDetailed.checkItem.ciContent}}</td>
                            <td>{{setmealDetailed.checkItem.meaning}}</td>
                        </tr>
                    </table>
                </div>
            </li>
            
        </ul>
        </div>

        <div class="bottom-ban"></div>
        <Footer></Footer>
    </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import { reactive, toRefs } from "vue";
import { useRoute,useRouter } from "vue-router";
import axios from "axios";
import { getSessionStorage } from "../common.js";
axios.defaults.baseURL = "http://localhost:8081/tijian/";
export default {
    setup(){
        const router = useRouter();
        const route =useRoute();

        const appointmentType= sessionStorage.getItem('appointmentType') || 'personal' // 默认是个人预约  
        const flag= appointmentType==='family'?false:true
        const state = reactive({
            setmealArr:[],
            setmealArrMan: [],
            setmealArrWoman:[]
        });

        init();
        function init(){
            console.log('----------------');
            console.log(appointmentType);  //family
            console.log('----------------');
            console.log(flag);
            console.log(getSessionStorage('users').sex);
            if(flag){ //默认为个人
                console.log('presonal');
                axios
            .post("setmeal/listSetmealByType", {
                type: getSessionStorage('users').sex
                })
                .then((response) => {
                    let arr = response.data;
                    for(let i=0;i<arr.length;i++){
                        arr[i].isShow=false;
                    }
                    state.setmealArrAll += arr;
                })
                .catch((error) => {
                    console.error(error);
                });
                    // console.log(state.setmealArr);
            }
            else{
                axios
                .post("setmeal/listSetmealByType", {
                    type: 1
                    })
                    .then((response) => {
                        let arr = response.data;
                        // console.log('----------------');
                        // console.log(arr);
                        for(let i=0;i<arr.length;i++){
                            // arr[i].isShow=false;
                        }
                        state.setmealArrMan = arr;
                        // console.log(state.setmealArrMan)
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                axios
                .post("setmeal/listSetmealByType", {
                    type: 0
                    })
                    .then((response) => {
                        let arr = response.data;
                        // console.log('----------------');
                        // console.log(arr);
                        for(let i=0;i<arr.length;i++){
                            // arr[i].isShow=false;
                        }
                        state.setmealArrWoman = arr;
                        // console.log(state.setmealArrWoman)
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                    console.log(state.setmealArrMan)
                    console.log(state.setmealArrWoman)
            }
            
        }
        function isShowEventMan(index){
            state.setmealArrMan[index].isShow=!state.setmealArrMan[index].isShow;
        }

        function isShowEventWoman(index){
            state.setmealArrWoman[index].isShow=!state.setmealArrWoman[index].isShow;
        }

        function isShowEvent(index){
            state.setmealArr[index].isShow=!state.setmealArr[index].isShow;
        }

        function toSelectDate(smId){
            router.push({path:'/selectDate',query:{hpId:route.query.hpId,smId:smId}});
        }
        function returnFlag(){
            return flag
        }

        return{
            ...toRefs(state),
            isShowEventMan,
            isShowEventWoman,
            isShowEvent,
            toSelectDate,
            returnFlag
        };
    },
    components: { Footer },
     
};
</script>

<style scoped>
.wrapper{
    width: 100%;
    height:100%;
    background-color: #f9f9f9;
}

header{
    width:100%;
    height:15.7vw;
    background-color: #fff;

    position:fixed;
    left: 0;
    top:0;

    display: flex;
    align-items:center;
    justify-content: space-between;

    box-sizing: border-box;
    padding:0 3.6vw;
}

header fa{
    font-size:8vw;
}



footer{
    width:100%;
    height:14.2vw;
    box-sizing: border-box;
    border-top:solid 1px #E9E9E9;
    background-color: #FFF;

    position:fixed;
    left:0;
    bottom:0;
}

footer ul{
    width: 100%;
    height:14.2vw;
    display:flex;
    align-items:center;
    justify-content: space-around;
}
footer ul li{
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content:center;

    font-size: 3vw;
    color:#999;

    user-select:none;
    cursor:pointer;
}
footer ul li .fa{
    font-size:5vw;
}



.top-ban{
    width:100%;
    height:15.7vw;
}

.middle-ban{
    width:100%;
    height:1px;
    background-color: #E9E9E9;
}

.bottom-ban{
    width:100%;
    height:14.2vw;
}

.setmeal{
    width: 100%;
    margin-top: 10vw;
}
.setmeal li{
    width:92.8vw;
    margin: 0 auto;
    border:solid 1 px #eee;
    border-radius: 1vw;
    box-shadow:2px 2px 5px rgba(0,0,0,.08);
    background-color:#FFF;
    margin-bottom:3.6vw;
}
.setmeal li .item{
    width: 100%;
    height: 20vw;
    color: #555;

    display: flex;
    align-items: center;
}
.setmeal li .item .item-left{
    flex:0 0 72vw;
    height: 20vw;
    border-right: solid 1px #eee;
    box-sizing: border-box;
    padding-left: 12vw;

    display: flex;
    flex-direction: column;
    justify-content: center;

    user-select: none;
    cursor: pointer;
}
.setmeal li .item .item-left h3{
    font-size: 4.3vw;
    font-weight: 600;
}
.setmeal li .item .item-left p{
    font-size: 4vw;
    font-weight: 1vw;
}
.setmeal li .item .item-right{
    flex:1;
    display: flex;
    justify-content:center ;
    align-items: center;

    user-select: none;
    cursor: pointer;
}
.setmeal li .item .item-right p{
    font-size: 4vw;
    margin-right: 2vw;
}
.setmeal li .item-content{
    /*display:none;*/
    width: 100%;
    background-color: #FFF;
}
.setmeal li .item-content table{
    width: 100%;
    border-collapse: collapse;
    font-size: 4vw;
    color: #555;
}
.setmeal li .item-content table tr{
    display: flex;

}
.setmeal li .item-content table tr td,.setmeal li .item-content table tr th{
    flex: 1;
}
.setmeal li .item-content table tr th{
    text-align: center;
    background-color: #eee;
    height: 10vw;
    line-height: 10vw;
}
.setmeal li .item-content table tr td{
    border: solid 1px #efefef;
    box-sizing: border-box;
    padding: 2vw;
}
</style>