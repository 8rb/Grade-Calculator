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

const Grades = () => {

    const [grades, setGrades] = useState<Grade[]>([{grade: '', percentage: ''}, {grade: '', percentage: ''}, {grade: '', percentage: ''}])
    const [minGrade, setMinGrade] = useState('12.5');
    const [isModalActive, setModalActive] = useState(false);

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
                <Modal onClick={() => closeModal()}>JALASTE PERRO</Modal>
            </ModalWrapper>
        }
        </>
    )
}

export default Grades;