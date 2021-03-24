import React, { useState, useEffect } from 'react'
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
    ModalWrapper,
    ModalTitle,
    ModalGradeText,
    GradeText,
    ModalMessage
    } from './Grades.styles';

import { Grade, ModalInfo } from '../utils/types';
import { calculateGrade } from '../utils/calculateGrade';
import { generateColor } from '../utils/generateColor';
import { initGrades } from '../utils/initGrades';

const Grades = () => {

    const [grades, setGrades] = useState<Grade[]>(initGrades);
    const [minGrade, setMinGrade] = useState('12.5');
    const [isModalActive, setModalActive] = useState(false);
    const [modalInfo, setModalInfo] = useState<ModalInfo>();
    const [actualPercentage, setActualPercentage] = useState(0);

    useEffect(() => {
        //Only runs once, when component is rendered
    },[]);

    const addGrade = () => {
        if(actualPercentage < 100) {
            let newArray = [...grades];
            const NewGrade: Grade = {
                grade: '',
                percentage: '',
            };
            newArray.push(NewGrade);
            setGrades(newArray);
        }
    }

    const removeGrade = (index: number) => {
        let newArray = [...grades];
        if(newArray.length > 1) {
            newArray.splice(index, 1);
        }
        else {
            let newArray = [...grades];
            newArray[0].grade = "";
            newArray[0].percentage = "";
        }
        setGrades(newArray);
    }

    const updateValue = (index: number, type: string) => (e: any) => {
        let newArray = [...grades];
        if(type === "grade") {
            if(+e.target.value >= 0 && +e.target.value <= 20) {
                newArray[index].grade = e.target.value;
            }
        }
        else {
            if(+e.target.value >= 0 && +e.target.value <= 100) {
                let old = newArray[index].percentage;
                newArray[index].percentage = e.target.value;
                let acum = 0;
                for (let i = 0; i < newArray.length; i++) {
                    acum+=(+newArray[i].percentage);
                }
                if(acum <= 100) {
                    setActualPercentage(acum);
                }
                else {
                    newArray[index].percentage = old;
                }
            }
        }
        setGrades(newArray);
    }

    const listOfGrades = grades.map(({grade, percentage}, index) => 
        <GradeRow key={index} color={generateColor(index)}>
            <Input type="number" value={grade} onChange={updateValue(index, "grade")}/>
            <Input type="number" value={percentage} onChange={updateValue(index, "percentage")}/>
            <CloseButton onClick={() => removeGrade(index)}><XIcon>&times;</XIcon></CloseButton>
        </GradeRow>
    )

    const onClickCalculate = () => {
        calculateGrade(minGrade, grades, setModalActive, setModalInfo);
    }

    const closeModal = () => {
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
                <CalcButton onClick={() => onClickCalculate()}>Por cuánto me voy?</CalcButton>
            </ButtonContainer>
        </GradesWrapper>
        {isModalActive &&
            <ModalWrapper onClick={() => closeModal()}>
                <Modal color={modalInfo?.color}>
                    <ModalTitle>{modalInfo?.title}</ModalTitle>
                    <ModalGradeText> {"Necesitas"} <GradeText>{modalInfo?.gradeNeeded}</GradeText> {"en tu final para pasar."}</ModalGradeText>
                    <ModalMessage>{modalInfo?.message}</ModalMessage>
                </Modal>
            </ModalWrapper>
        }
        </>
    )
}

export default Grades;