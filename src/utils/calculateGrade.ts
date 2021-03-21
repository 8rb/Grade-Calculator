import { Grade, ModalInfo } from './types';

export const calculateGrade = (minGrade: string, grades: Grade[], setModalActive: Function, setModalInfo: Function) => {
    let acum = 0;
    let acumPercentage = 0;
    for (let i = 0; i < grades.length; i++) {
        const element = grades[i];
        acum+=(+element.grade * +element.percentage / 100);
        acumPercentage+=(+element.percentage);
    }
    let pointsNeed = +minGrade - acum;
    let percentageLeft = 100 - acumPercentage;
    let gradeNeed = pointsNeed / percentageLeft * 100;
    gradeNeed = Math.round((gradeNeed + Number.EPSILON) * 100) / 100
    setModalActive(true);

    let calcTitle = "";
    let calcMessage = "";
    let color = "#5C82FF";
    
    if(gradeNeed <= 0) {
        calcTitle = "YA PASASTE";
        calcMessage = "Se logró sin final";
    }
    else if(gradeNeed > 0 && gradeNeed < 18) {
        calcTitle = "SE LOGRA";
        calcMessage = "Estudia nomás";
    }
    else if(gradeNeed > 18 && gradeNeed <= 20) {
        calcTitle = "SE COMPLICA";
        calcMessage = "Tendrás panetón por ahí?";
    }
    else {
        calcTitle = "ERES BIKA";
        calcMessage = "No es posible, un gusto.";
        color = "#4B4B4B";
    }

    let modalInfo: ModalInfo = {
        title: calcTitle,
        gradeNeeded: gradeNeed,
        message: calcMessage,
        color: color,
    }
    setModalInfo(modalInfo);
}

export default calculateGrade;