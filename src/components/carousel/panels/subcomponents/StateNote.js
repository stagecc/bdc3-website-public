import styled from "styled-components";

export const StateNote = styled.span`
color: #eee;
background-color: #000000;
position: absolute;
top: 1rem;
left: 0;
padding: 0.5rem;
padding-left: 1rem;
border-radius: 4px;
font-size: 65%;
text-transform: uppercase;
display: flex;
align-items: center;
cursor: default;
transition: transform 250ms, filter 250ms;
transform: translateX(calc(-100% + 32px));
filter: opacity(0.5);
&:hover {
  transform: translateX(-0.25rem);
  filter: opacity(0);
}
`;