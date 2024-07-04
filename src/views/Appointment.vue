<template>
  <div class="wrapper">
        <header>
            <i class="fa fa-angle-left" onclick="history.go(-1)"></i>
            <p>用户体检预约</p>
            <div></div>
        </header>
        <div class="top-ban"></div>

        <section>
        <img src="../assets/yuyue.png">
        <p>
            <img src="../assets/benrenyuyue.png" @click="toHospital">
            <img src="../assets/jiashuyuyue.png" @click="toHospitalT">
        </p>
        </section>


        <div class="bottom-ban"></div>
        <Footer></Footer>

    </div>
</template>

<script>
import { useRouter } from "vue-router";
import Footer from "../components/Footer.vue";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8081/tijian/";
import { getSessionStorage } from "../common.js";


export default {
    setup(){
        const router = useRouter();

        function toHospital(){
            axios.post("orders/getOrdersByUserId",{
                userId:getSessionStorage('users').userId
            })
            .then((response) => {
               if(response.data>=1){
                alert('已预约');
               }else{
                //添加个人预约标记
                sessionStorage.setItem('appointmentType', 'personal');
                router.push('/hospital');
               }
            })
            .catch((error) => {
                console.error(error);
            });
        }
        function toHospitalT(){
            //添加家属预约标记
            sessionStorage.setItem('appointmentType', 'family');
            console.log("家属预约");
            router.push('/hospital');
        }
        return{
            toHospital,
            toHospitalT
        };
    },
    components:{
        Footer,
    },
};
</script>

<style scoped>
.wrapper{
    width: 100%;
    height:100%;
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
    width:100%;
}

section img{
    width:100vw;
}

section p{
    box-sizing: border-box;
    padding:0 3.6vw;
    margin-top:10vw;

    display:flex;
    justify-content:space-between;
}

section p img{
    width:44vw;
    border-radius:1.6vw;
    display:block;
    cursor:pointer;
}
</style>