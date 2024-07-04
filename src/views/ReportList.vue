<template>
   <div class="wrapper">
        <header>
            <i class="fa fa-angle-left" onclick="history.go(-1)"></i>
            <p>健康档案</p>
            <div></div>
        </header>
        <div class="top-ban"></div>


        <section>
            <img src="../assets/report.png">
            <ul>
                <li v-for="orders in ordersArr" :key="orders.orderId">
                    <div class="left" onclick="location.href='report.html'">
                        <i class="fa fa-file-text-o"></i>
                    <div>
                        <p>{{convert (orders.orderDate) }}体检报告</p>
                         {{gethpName(orders.hpId)}}
                         <p>{{name}}</p>
                    </div>
                    </div>
                    <div class="right" @click="toReport(orders.orderId)">
                        <i class="fa fa-angle-right"></i>
                    </div>
                </li>
              
            </ul>
        </section>


        <div class="bottom-ban"></div>
        <Footer></Footer>

    </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import {  reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8081/tijian/";
import { getSessionStorage } from "../common.js";
export default {
    setup(){
        const router = useRouter();

        const states = reactive({
           users:getSessionStorage('users'),
           ordersArr:[],
           name:''
        });

        init();
        function init(){
          axios
            .post("orders/listOrdersByUserId", {
                userId: states.users.userId,
                state:2
                })
                .then((response) => {
                    states.ordersArr=response.data; 
                    // console.log('-----------data');
                    // console.log(response.data);
                    
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        function gethpName(hpId){
            // this.name=''
            axios.post('hospital/getHospitalById', {
                hpId,
            })
            .then(response=>{
                // console.log(response);
                // console.log('-----------------status');
                // console.log(response.status);
                // console.log('-----------------data');
                // console.log(response.data);
                this.name=response.data.name
                // console.log(this.name);
            }).catch(err=>{
            console.log(err);
            })
            // return name
        }
        
        function convert(str){
          let arr=str.split('-');
          return arr[0]+'年'+arr[1]+'月'+arr[2]+'日';
        }

        function toReport(orderId){
          router.push({path:'/report',query:{orderId:orderId}});
        }
        return{
            ...toRefs(states),
            convert,
            toReport,
            gethpName
        };
    },
    components: { Footer }
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

section{
    width: 100%;
}
section img{
    width: 100%;
    display: block;
}
section ul{
    width: 86vw;
    margin: 0 auto;
}
section ul li{
    width: 100%;
    height: 18vw;
    border-bottom: solid 1px #EEE;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
section ul li .left{
    display: flex;
    align-items: center;
}
section ul li .left i{
    font-size: 8vw;
    color: #6bb9b6;
    margin-right: 3vw;
}
section ul li .left p:first-child{
    color: #555;
    font-size: 4.2vw;
    font-weight: 600;
}
section ul li .left p:last-child{
    color: #999;
    font-size: 3.2vw;
    font-weight: 600;
    margin-top: 1vw;
}
section ul li .right i{
    color: #999;
    font-size: 6vw;
}
</style>