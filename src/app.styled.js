import styled from '@emotion/styled'

export const DivMain = styled.div` 
  display: grid;
  grid-template: 1fr  1fr / 1fr minmax(300px, 1440px) 1fr;
  grid-gap: 10px;
  justify-items: center;
  align-items: center;
  justify-content: center;
  height: 40px;
  margin-top: 40px;
`
export const DivContent = styled.div`
  border: solid 1px black;
  grid-column: 2/3;
  display: grid;
  grid-template: 40px minmax(100px, 1fr) / 1fr;
  width: 100%;
  height: 100%;
  justify-items: center;
  align-items: center;
  justify-content: center;
`
export const DivWork = styled.div`
  display: grid;
  grid-template: minmax( 400px, 1fr) / 0.5fr 1fr;
  width: 100%;
  height: 100%;
  justify-items: center;
  align-items: center;
  justify-content: center;
`