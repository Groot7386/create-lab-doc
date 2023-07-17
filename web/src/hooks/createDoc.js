/*
 * @Author: fanjf
 * @Date: 2022-12-01 10:59:04
 * @LastEditTime: 2022-12-08 10:53:38
 * @LastEditors: fanjf
 * @FilePath: \travel-filing\src\hooks\createDoc.js
 * @Description: 🎉🎉🎉
 */
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";


const beautifyTime = (value) => {
    return +value < 10 ? `0${value}` : value
}

export const createDoc = () => {
    const router = useRoute();
    const createLoading = ref(false);
    const downloadDoc = ({ docData, templateName, type }) => {
        createLoading.value = true;
        let time = new Date();
        let todayNum = `${time.getFullYear()}${beautifyTime(time.getMonth() + 1)}${beautifyTime(time.getDate())}`;
        // docData.submitDate = today;
        docData.submitYear = time.getFullYear();
        docData.submitMonth = time.getMonth() + 1;
        docData.submitDate = time.getDate();
        docData.todayNum = todayNum;
        // docData.currentTime = time.getTime();
        let url = new URL(`../assets/template/${templateName}`, import.meta.url).href;
        PizZipUtils.getBinaryContent(url, (error, content) => {
            if (error) {
                console.log('downloadDoc', error)
                createLoading.value = false;
                alert(`生成文档时发生错误，请联系${document.getElementsByTagName("meta")?.email?.content || 'hdu424fan@qq.com'}查看处理`)
                throw error;
            }
            // console.log('content',content)
            const zip = new PizZip(content);
            const doc = new Docxtemplater(zip, {
                paragraphLoop: true, // 一般开启，建议打开该选项，因为它使渲染更容易推理。
                linebreaks: true, // 启用换行符
            });
            doc.setData(docData);
            doc.render();
            const out = doc.getZip().generate({
                type: "blob",
                mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            });
            saveAs(out, `${todayNum}_${docData?.username || router.name}_${router.meta.title}.docx`);
            createLoading.value = false;
        })
    }
    return {
        createLoading,
        downloadDoc
    }
}