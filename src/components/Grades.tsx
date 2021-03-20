import React, { useState } from 'react'
import {
    GradesWrapper,
    UpperContainer,
    UpperContainerRow,
    UpperContainerTitle,
    GradesRowContainer,
    ButtonContainer,
    GradeRowTitle,
    GradeRow, 
    CreateButton,
    PlusIcon,
    CalcButton,
    Input,
    CloseButton,
    XIcon,
    Modal,
    ModalWrapper} from './Grades.styles';

type Grade = {
    grade: string,
    percentage: string
}

type ModalInfo = {
    title: string,
    gradeNeeded: number,
    message: string,
    color: string,
}

const Grades = () => {

    const [grades, setGrades] = useState<Grade[]>([{grade: '', percentage: ''}, {grade: '', percentage: ''}, {grade: '', percentage: ''}])
    const [minGrade, setMinGrade] = useState('12.5');
    const [isModalActive, setModalActive] = useState(false);
    const [modalInfo, setModalInfo] = useState<ModalInfo>();

    const updateValue = (index: number, type: string) => (e: any) => {
        let newArray = [...grades];
        if(type === "grade")
            newArray[index].grade = e.target.value;
        else
            newArray[index].percentage = e.target.value;
        setGrades(newArray);
    }

    const listOfGrades = grades.map(({grade, percentage}, index) => 
        <GradeRow key={index}>
            <Input type="number" value={grade} onChange={updateValue(index, "grade")}/>
            <Input type="number" value={percentage}onChange={updateValue(index, "percentage")}/>
            { grades.length > 1 ? 
            <CloseButton onClick={() => closeGrade(index)}><XIcon>&times;</XIcon></CloseButton>
            : <CloseButton><XIcon>&times;</XIcon></CloseButton>}
        </GradeRow>
    )

    const closeGrade = (index: number) => {
        let newArray = [...grades];
        newArray.splice(index, 1);
        setGrades(newArray);
    }

    const addGrade = () => {
        let newArray = [...grades];
        const NewGrade: Grade = {
            grade: '',
            percentage: '',
        };
        newArray.push(NewGrade);
        setGrades(newArray);
    }

    const calculateGrade = () => {
        let acum = 0;
        let acumPercentage = 0;
        for (let i = 0; i < grades.length; i++) {
            const element = grades[i];
            // console.log(element);
            acum+=(+element.grade * +element.percentage / 100);
            acumPercentage+=(+element.percentage);
        }
        console.log(acum);
        console.log(acumPercentage);
        let pointsNeed = +minGrade - acum;
        let percentageLeft = 100 - acumPercentage;
        console.log(pointsNeed);
        let gradeNeed = pointsNeed / percentageLeft * 100;
        console.log("You need", gradeNeed);
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

    const closeModal = () => {
        console.log("cerrando");
        setModalActive(false);
    }

    return (
        <>
        <GradesWrapper>
            <UpperContainer>
                <UpperContainerTitle>Soy Bika?</UpperContainerTitle>
                <UpperContainerRow>
                    <CreateButton onClick={() => addGrade()}><PlusIcon>+</PlusIcon></CreateButton>
                    <div>Paso con: <Input type="number" value={minGrade} onChange={e => setMinGrade(e.target.value)}/>
                    </div>
                </UpperContainerRow>
            </UpperContainer>
            <GradesRowContainer>
                <GradeRowTitle>
                    <p>Nota</p>
                    <p>Peso %</p>
                    <p></p>
                </GradeRowTitle>
                {listOfGrades}
            </GradesRowContainer>
            <ButtonContainer>
                <CalcButton onClick={() => calculateGrade()}>Por cuánto me voy?</CalcButton>
            </ButtonContainer>
        </GradesWrapper>
        {isModalActive &&
            <ModalWrapper onClick={() => closeModal()}>
                <Modal onClick={() => closeModal()} color={modalInfo?.color}>
                    <h1>{modalInfo?.title}</h1>
                    <p>{`Necesitas ${modalInfo?.gradeNeeded} en tu final para pasar `}</p>
                    <p>{modalInfo?.message}</p>
                </Modal>
            </ModalWrapper>
        }
        </>
    )
}

export default Grades;