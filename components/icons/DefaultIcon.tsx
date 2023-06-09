import React, {FC, useRef, useEffect} from 'react'

interface IconParams {
    icon: number,
    title: string,

}


const DefaultIcon: FC <IconParams> = ({icon, title, ...rest}) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (svgRef.current) {
          const { x, y, width, height } = svgRef.current.getBBox();
          svgRef.current.setAttribute("viewBox", `${x} ${y} ${width} ${height}`);
        }
      }, []);

    return (
        <svg 
            ref={svgRef}
            width={30}
            height={30}
            
            fill="none"
            viewBox="0 -11.47 122.88 122.88"
            version="1.1"
            id={title}
            role="img"
            {...rest}
        >
            <title>{title}</title>
            { icon === 2 &&
                <g>
                    <path d="M4.22,67.36h114.31v-4.67c0-1.13-0.22-2.18-0.61-3.12c-0.42-1-1.04-1.89-1.81-2.66c-0.47-0.47-1-0.9-1.57-1.28 c-0.58-0.39-1.2-0.73-1.85-1.02c-1.75-0.38-3.49-0.74-5.22-1.08c-1.74-0.34-3.49-0.66-5.25-0.96c-0.08-0.01-0.14-0.02-0.22-0.04 c-0.89-0.15-1.74-0.29-2.55-0.42c-0.81-0.13-1.67-0.26-2.57-0.4l-0.02,0c-6.12-0.78-12.22-1.38-18.31-1.78 c-6.1-0.4-12.17-0.6-18.2-0.61c-3.58,0-7.15,0.06-10.72,0.2c-3.55,0.14-7.12,0.34-10.69,0.62l-0.02,0 c-3.34,0.31-6.67,0.7-10.01,1.15c-3.33,0.45-6.67,0.98-10.03,1.57l-0.37,0.09c-0.07,0.02-0.14,0.03-0.2,0.03 c-0.06,0.01-0.12,0.01-0.18,0.01c-1.57,0.28-3.18,0.59-4.84,0.92c-1.61,0.32-3.22,0.66-4.82,1.01c-0.4,0.22-0.78,0.47-1.14,0.73 c-0.36,0.27-0.71,0.56-1.02,0.87v0c-0.67,0.67-1.2,1.44-1.56,2.3c-0.34,0.81-0.53,1.71-0.53,2.69V67.36L4.22,67.36z M14.2,0h92.99 c1.21,0,2.37,0.24,3.43,0.68c1.1,0.46,2.09,1.13,2.92,1.95c0.83,0.83,1.5,1.82,1.95,2.92c0.44,1.06,0.68,2.22,0.68,3.43v42.69 c0.51,0.3,1.01,0.63,1.47,0.99c0.52,0.4,1.01,0.82,1.46,1.27c1.16,1.16,2.1,2.51,2.73,4.03c0.6,1.43,0.93,3.02,0.93,4.74v6.09 c0.03,0.1,0.06,0.2,0.08,0.3l0,0.02c0.02,0.13,0.03,0.25,0.03,0.37c0,0.13-0.01,0.26-0.04,0.39l0,0c-0.02,0.1-0.05,0.2-0.08,0.3 v27.66c0,0.58-0.24,1.11-0.62,1.49c-0.38,0.38-0.91,0.62-1.49,0.62h-4.35c-0.49,0-0.94-0.17-1.3-0.45 c-0.36-0.28-0.63-0.68-0.74-1.14c-0.8-2.3-1.61-4.12-2.48-5.54c-0.86-1.4-1.78-2.4-2.84-3.11c-1.07-0.71-2.35-1.16-3.9-1.43 c-1.58-0.28-3.42-0.37-5.61-0.36l-79.76,0.1l-0.04,0c-1.57-0.03-2.86,0.17-3.94,0.59c-1.07,0.42-1.94,1.05-2.66,1.86 c-0.81,0.9-1.49,2.05-2.11,3.39c-0.63,1.37-1.2,2.93-1.77,4.64l0,0c-0.14,0.44-0.42,0.79-0.77,1.04c-0.33,0.24-0.73,0.38-1.14,0.4 c-0.03,0.01-0.06,0.01-0.09,0.01H2.11c-0.58,0-1.11-0.24-1.49-0.62C0.24,98.94,0,98.41,0,97.83V61.52c0-1.57,0.3-3.01,0.84-4.31 c0.58-1.38,1.43-2.61,2.49-3.67c0.3-0.3,0.63-0.6,0.98-0.88c0.3-0.24,0.6-0.47,0.92-0.68V8.89c0-1.21,0.24-2.36,0.68-3.4 c0.46-1.09,1.13-2.07,1.96-2.89c0.83-0.82,1.82-1.47,2.91-1.92C11.84,0.24,12.99,0,14.2,0L14.2,0z M107.19,4.22H14.2 c-0.65,0-1.27,0.13-1.84,0.36c-0.59,0.24-1.11,0.59-1.55,1.02c-0.43,0.42-0.78,0.94-1.02,1.5C9.57,7.65,9.45,8.25,9.45,8.89v41.06 c0.3-0.1,0.6-0.18,0.91-0.26c0.49-0.13,0.98-0.24,1.47-0.32c0.68-0.12,1.42-0.25,2.22-0.39c0.6-0.1,1.24-0.21,1.9-0.31V38.19 c0-1.58,0.32-3.09,0.89-4.47c0.6-1.44,1.47-2.73,2.55-3.81c1.08-1.08,2.37-1.95,3.81-2.55c1.38-0.57,2.89-0.89,4.47-0.89h19.82 c1.58,0,3.09,0.32,4.47,0.89c1.44,0.6,2.73,1.47,3.81,2.55c1.08,1.08,1.95,2.37,2.55,3.81c0.57,1.38,0.89,2.89,0.89,4.47v6.69 c0.7-0.01,1.4-0.01,2.11-0.01v-6.68c0-1.58,0.32-3.09,0.89-4.47c0.6-1.44,1.47-2.73,2.55-3.81c1.08-1.08,2.37-1.95,3.81-2.55 c1.38-0.57,2.89-0.89,4.47-0.89h19.82c1.58,0,3.09,0.32,4.47,0.89c1.44,0.6,2.73,1.47,3.81,2.55c1.08,1.08,1.95,2.37,2.55,3.81 c0.57,1.38,0.89,2.89,0.89,4.47v10.34c0.75,0.11,1.55,0.24,2.41,0.38c0.95,0.15,1.86,0.3,2.74,0.45c0.45,0.08,0.91,0.17,1.37,0.28 c0.29,0.07,0.57,0.14,0.84,0.22V8.98c0-0.64-0.13-1.25-0.36-1.81c-0.24-0.58-0.6-1.1-1.04-1.55c-0.44-0.44-0.97-0.8-1.54-1.04 C108.44,4.35,107.83,4.22,107.19,4.22L107.19,4.22z M43.21,45.56c2.01-0.15,4.03-0.28,6.08-0.38c1.89-0.1,3.8-0.17,5.71-0.22v-6.77 c0-1.01-0.2-1.98-0.57-2.86c-0.38-0.92-0.94-1.74-1.64-2.44c-0.69-0.69-1.52-1.25-2.44-1.64c-0.88-0.37-1.85-0.57-2.86-0.57H27.67 c-1.01,0-1.98,0.2-2.86,0.57c-0.92,0.38-1.74,0.94-2.44,1.64c-0.69,0.69-1.25,1.52-1.64,2.44c-0.37,0.88-0.57,1.85-0.57,2.86V48 c1.62-0.24,3.26-0.46,4.94-0.68c1.81-0.23,3.61-0.44,5.39-0.64c0.69-0.08,1.43-0.17,2.2-0.25c0.72-0.08,1.47-0.15,2.27-0.23 c1.36-0.13,2.71-0.25,4.04-0.36C40.37,45.75,41.77,45.65,43.21,45.56L43.21,45.56z M65.54,44.9c1.21,0.02,2.42,0.05,3.63,0.09 c1.34,0.04,2.68,0.1,4.01,0.16l0.01,0c2.19,0.08,4.33,0.18,6.41,0.3c2.08,0.12,4.11,0.27,6.05,0.44c2.82,0.25,5.55,0.55,8.14,0.9 c2.32,0.32,4.52,0.68,6.58,1.08v-9.68c0-1.01-0.2-1.98-0.57-2.86c-0.38-0.92-0.94-1.74-1.64-2.44c-0.69-0.69-1.52-1.25-2.44-1.64 c-0.88-0.37-1.85-0.57-2.86-0.57H73.05c-1.01,0-1.98,0.2-2.86,0.57c-0.92,0.38-1.74,0.94-2.44,1.64c-0.69,0.69-1.25,1.52-1.64,2.44 c-0.37,0.88-0.57,1.85-0.57,2.86V44.9L65.54,44.9z M118.54,71.59H4.22v24.13h1.43c0.56-1.58,1.14-3.05,1.79-4.36 c0.7-1.4,1.49-2.64,2.45-3.71c1.14-1.28,2.48-2.27,4.09-2.93c1.61-0.65,3.49-0.98,5.75-0.93l79.69-0.1c2.57,0,4.77,0.12,6.69,0.49 c1.95,0.37,3.63,1,5.14,2c1.4,0.93,2.6,2.16,3.68,3.77c1.03,1.54,1.95,3.43,2.83,5.76h0.76V71.59L118.54,71.59z" fill='#bcbcbc'/>
                </g>
            }
            { icon === 1 &&
                <g>
                    <path d="M511 271.4H368l21.8 214.5h242.4L654 271.4zM558.6 647.2l32.8 178.7H430.6l32.8-178.7" fill="#CDE9E3" />
                    <path d="M671.9 481.9v78c0 85.2-72 154.3-160.9 154.3-88.8 0-160.9-69.1-160.9-154.3v-78h321.8zM707.6 199.9H314.4l11.2 71.5h370.8z" fill="#CDE9E3" />
                    <path d="M721.2 188.3c-3.4-4-8.4-6.3-13.6-6.3H314.4c-5.2 0-10.2 2.3-13.6 6.3-3.4 4-4.9 9.2-4.1 14.4l11.2 71.5c1.4 8.7 8.9 15.1 17.7 15.1h26.3L370 464h-19.9c-9.9 0-17.9 8-17.9 17.9v78c0 67.9 41.2 126.6 100.6 154.6L413 822.7c-1 5.2 0.4 10.6 3.8 14.7s8.4 6.4 13.7 6.4h160.9c5.3 0 10.3-2.4 13.7-6.4 3.4-4.1 4.8-9.5 3.8-14.7L589 714.5c59.5-28 100.6-86.7 100.6-154.6v-78c0-9.9-8-17.9-17.9-17.9H652l10.7-103.1h20.7c9.9 0 17.9-8 17.9-17.9s-8-17.9-17.9-17.9h-17l3.7-35.9h26.3c8.8 0 16.3-6.4 17.7-15.1l11.2-71.5c0.8-5.1-0.7-10.3-4.1-14.3zM570 808.1H452l15-81.4c14.1 3.5 28.8 5.5 44 5.5s29.9-2 44-5.5l15 81.4z m-59-111.7c-78.8 0-143-61.2-143-136.4v-24.3h286V560c0 75.2-64.2 136.4-143 136.4z m143-178.7H368v-18h286v18z m-23.5-192.5h-10.7c-9.9 0-17.9 8-17.9 17.9s8 17.9 17.9 17.9h7l-10.7 103H406l-18.2-174.6h246.4l-3.7 35.8z m50.6-71.7H340.9l-5.6-35.7h351.4l-5.6 35.7z" fill="#211F1E" />
                </g>
            }
            { icon === 3 &&
                <g>
                    <path d="M32 29.6256H36V32.6256C36 33.1776 35.552 33.6256 35 33.6256H33C32.448 33.6256 32 33.1776 32 32.6256V29.6256Z" stroke="#3C3C3C" stroke-width="2"/>
                    <path d="M10 29.6256H14V32.6256C14 33.1776 13.552 33.6256 13 33.6256H11C10.448 33.6256 10 33.1776 10 32.6256V29.6256Z" stroke="#3C3C3C" stroke-width="2"/>
                    <path d="M14 19.6256H32C34.209 19.6256 36 21.4166 36 23.6256V28.6256C36 29.1776 35.552 29.6256 35 29.6256H11C10.448 29.6256 10 29.1776 10 28.6256V23.6256C10 21.4166 11.791 19.6256 14 19.6256Z" stroke="#3C3C3C" stroke-width="2"/>
                    <path d="M32 23.6256C32.552 23.6256 33 24.0736 33 24.6256C33 25.1776 32.552 25.6256 32 25.6256C31.448 25.6256 31 25.1776 31 24.6256C31 24.0736 31.448 23.6256 32 23.6256Z" fill="#3C3C3C"/>
                    <path d="M14 23.6256C14.552 23.6256 15 24.0736 15 24.6256C15 25.1776 14.552 25.6256 14 25.6256C13.448 25.6256 13 25.1776 13 24.6256C13 24.0736 13.448 23.6256 14 23.6256Z" fill="#3C3C3C"/>
                    <path d="M15.693 11.6256H30.307C30.724 11.6256 31.097 11.8846 31.243 12.2746L34 19.6256H12L14.757 12.2746C14.903 11.8846 15.276 11.6256 15.693 11.6256Z" stroke="#3C3C3C" stroke-width="2"/>
                    <path d="M9 16.6256H12V18.6256H9V16.6256Z" fill="#3C3C3C"/>
                    <path d="M34 16.6256H37V18.6256H34V16.6256Z" fill="#3C3C3C"/>
                    <path d="M17 24.6256H29" stroke="#3C3C3C" stroke-width="2"/>
                </g>
            }
            { icon === 4 &&
                <g>
                    <path d="M9 0 A 1.0001 1.0001 0 0 0 8 1L8 4.484375L1.4179688 9.1855469 A 1.0001 1.0001 0 0 0 1 10L1 14 A 1.0001 1.0001 0 0 0 2 15L24 15 A 1.0001 1.0001 0 0 0 25 14L25 10 A 1.0001 1.0001 0 0 0 24.582031 9.1855469L18 4.4863281L18 1 A 1.0001 1.0001 0 0 0 17 0L9 0 z M 10 2L16 2L16 5 A 1.0001 1.0001 0 0 0 16.417969 5.8144531L23 10.513672L23 13L3 13L3 10.513672L9.5820312 5.8144531 A 1.0001 1.0001 0 0 0 10 5L10 2 z M 5.5 21C4.8457598 21 4.2978026 21.418077 4.0917969 22L1 22 A 1.0001 1.0001 0 0 0 0 23L0 45 A 1.0001 1.0001 0 0 0 1 46L47.095703 46 A 1.0001 1.0001 0 0 0 48.095703 45L48.095703 23 A 1.0001 1.0001 0 0 0 47.095703 22L21.908203 22C21.702197 21.418077 21.15424 21 20.5 21L5.5 21 z M 2 24L5.5 24L20.5 24L24.095703 24L24.095703 44L2 44L2 24 z M 26.095703 24L46.095703 24L46.095703 30L26.095703 30L26.095703 24 z M 5 26 A 1.0001 1.0001 0 0 0 4 27L4 41 A 1.0001 1.0001 0 0 0 5 42L21 42 A 1.0001 1.0001 0 0 0 22 41L22 27 A 1.0001 1.0001 0 0 0 21 26L5 26 z M 30 26 A 1.0001 1.0001 0 1 0 30 28L42 28 A 1.0001 1.0001 0 1 0 42 26L30 26 z M 6 28L20 28L20 40L6 40L6 28 z M 26.095703 32L46.095703 32L46.095703 44L26.095703 44L26.095703 32 z M 29.984375 34.986328 A 1.0001 1.0001 0 0 0 29 36L29 41 A 1.0001 1.0001 0 1 0 31 41L31 36 A 1.0001 1.0001 0 0 0 29.984375 34.986328 z" fill="#000000"/>
                </g>
            }
            { icon === 5 &&
                <g>
                    <path d="M7.4 7H4.6C4.26863 7 4 7.26863 4 7.6V16.4C4 16.7314 4.26863 17 4.6 17H7.4C7.73137 17 8 16.7314 8 16.4V7.6C8 7.26863 7.73137 7 7.4 7Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M19.4 7H16.6C16.2686 7 16 7.26863 16 7.6V16.4C16 16.7314 16.2686 17 16.6 17H19.4C19.7314 17 20 16.7314 20 16.4V7.6C20 7.26863 19.7314 7 19.4 7Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M1 14.4V9.6C1 9.26863 1.26863 9 1.6 9H3.4C3.73137 9 4 9.26863 4 9.6V14.4C4 14.7314 3.73137 15 3.4 15H1.6C1.26863 15 1 14.7314 1 14.4Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M23 14.4V9.6C23 9.26863 22.7314 9 22.4 9H20.6C20.2686 9 20 9.26863 20 9.6V14.4C20 14.7314 20.2686 15 20.6 15H22.4C22.7314 15 23 14.7314 23 14.4Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8 12H16" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
            }
            { icon === 6 &&
                <g>
                    <path d="M429.823,409.401c-11.741-17.577-29.574-27.295-46.322-33.618c-8.41-3.157-16.624-5.492-23.859-7.474
                        c-7.227-1.965-13.508-3.618-17.725-5.213c-7.384-2.738-15.186-6.289-20.628-10.112c-2.722-1.899-4.81-3.856-6.027-5.517
                        c-1.225-1.702-1.562-2.878-1.578-3.906c0-7.103,0-15.974,0-27.666c9.447-10.508,23.021-26.794,28.595-52.618
                        c1.949-0.88,3.873-1.875,5.731-3.166c4.62-3.19,8.542-7.819,11.864-14.116c3.346-6.323,6.306-14.405,9.463-25.463
                        c1.603-5.607,2.343-10.474,2.343-14.815c0.008-4.999-1.028-9.332-2.911-12.85c-2.482-4.678-6.29-7.457-9.701-9.002l7.703-11.478
                        v-12.727c0.732-0.995,1.2-1.908,1.085-2.631v-27.567l19.6-39.184c4.966-9.932,1.127-22.018-8.666-27.263L265.693,2.43
                        c-6.05-3.24-13.327-3.24-19.378,0L133.21,63.015c-9.784,5.245-13.624,17.331-8.657,27.263l19.6,39.209v27.543
                        c-0.123,0.748,0.288,1.66,1.085,2.696v12.662l7.704,11.46c-0.798,0.354-1.62,0.757-2.467,1.275
                        c-2.664,1.644-5.352,4.218-7.235,7.745c-1.883,3.519-2.919,7.851-2.91,12.85c0,4.341,0.74,9.208,2.343,14.815
                        c4.226,14.726,8.041,24.238,12.982,31.218c2.475,3.461,5.287,6.24,8.345,8.361c1.858,1.29,3.783,2.286,5.731,3.166
                        c5.574,25.824,19.148,42.111,28.595,52.618c0,11.692,0,20.562,0,27.666c0,0.872-0.354,2.13-1.702,3.93
                        c-1.989,2.672-6.108,5.912-11,8.657c-4.876,2.771-10.483,5.18-15.391,6.907c-5.764,2.047-15.054,4.168-25.455,7.153
                        c-15.629,4.522-34.111,11.033-49.149,23.925c-7.506,6.446-14.092,14.544-18.729,24.607c-4.636,10.056-7.301,22.01-7.292,35.986
                        c0,3.248,0.14,6.602,0.428,10.072c0.222,2.434,1.142,4.407,2.236,6.034c2.064,3.042,4.81,5.295,8.246,7.622
                        c6.019,3.979,14.364,7.876,25.043,11.699c31.958,11.396,84.881,21.829,150.449,21.846c53.268,0,98.232-6.914,130.329-15.605
                        c16.057-4.349,28.875-9.118,38.141-13.878c4.646-2.393,8.394-4.768,11.37-7.358c1.488-1.316,2.795-2.688,3.889-4.325
                        c1.094-1.627,2.015-3.6,2.228-6.034c0.288-3.461,0.428-6.816,0.428-10.046C442.419,436.114,437.633,421.093,429.823,409.401z
                        M231.936,137.544c0-13.294,10.77-24.065,24.073-24.065c13.286,0,24.056,10.77,24.056,24.065v2.31
                        c0,13.287-10.77,24.065-24.056,24.065c-13.303,0-24.073-10.778-24.073-24.065V137.544z M236.466,460.639l-54.806-86.517
                        c4.991-2.088,10.104-4.727,14.84-7.777l31.366,45.104l15.128-28.455L236.466,460.639z M227.117,398.837l-25.273-36.332
                        c2.31-1.891,4.505-3.897,6.306-6.256c2.54-3.33,4.472-7.49,4.596-12.218l35.386,15.276L227.117,398.837z M212.795,336.887
                        c0-6.462,0-14.142,0-23.761v-2.77l-1.858-2.072c-9.874-10.993-23.234-25.586-27.871-51.516l-0.732-4.144l-3.955-1.414
                        c-2.524-0.896-4.439-1.817-6.116-2.984c-2.475-1.743-4.72-4.127-7.342-9.011c-2.59-4.86-5.328-12.119-8.328-22.65
                        c-1.324-4.604-1.792-8.181-1.792-10.845c0.008-3.083,0.6-4.884,1.2-6.026c0.913-1.653,2.032-2.36,3.454-2.936
                        c0.642-0.246,1.29-0.378,1.842-0.468l14.873,22.157l6.363-37.285l0.699-2.336c19.42,6.159,44.644,11.1,72.779,11.1
                        c28.06,0,53.366-4.9,72.794-11.041l0.674,2.277l6.364,37.285l14.873-22.141c0.937,0.148,2.195,0.46,3.166,1.102
                        c0.83,0.535,1.504,1.151,2.121,2.286c0.6,1.142,1.192,2.943,1.209,6.026c0,2.664-0.477,6.24-1.792,10.845
                        c-3.988,14.059-7.564,22.231-10.853,26.77c-1.644,2.293-3.149,3.724-4.818,4.892c-1.677,1.168-3.592,2.089-6.116,2.984
                        l-3.963,1.414l-0.724,4.144c-4.636,25.93-17.998,40.524-27.871,51.516l-1.858,2.072v2.77c0,9.62,0,17.299,0,23.761l-43.204,18.655
                        L212.795,336.887z M299.262,344.031c0.107,4.572,1.883,8.707,4.342,12.012c1.841,2.483,4.053,4.636,6.47,6.585l-25.191,36.208
                        l-21.006-39.53L299.262,344.031z M275.543,460.655l-6.528-77.653l15.12,28.447l31.308-45.022c1.044,0.667,2.089,1.324,3.182,1.949
                        c3.789,2.154,7.794,3.98,11.798,5.664L275.543,460.655z" fill='#000000'/>
                </g>
            }
            { icon === 7 &&
                <g>
                    <path d="M451.7 837.9c44.4 0 84.2-20.4 110.2-52.2 17.3-18 17.3-18 34.7 0 26 31.8 65.7 52.2 110.2 52.2 44.4 0 84.2-20.4 110.2-52.2 17.3-18 17.3-18 34.7 0 26 31.8 65.7 52.2 110.2 52.2v-28.1c-43.8 0-83.1-25-102-63.4-10.3-21.1-40.6-21.1-51 0-18.8 38.4-58.2 63.4-102 63.4s-83.1-25-102-63.4c-10.3-21.1-40.6-21.1-51 0-18.8 38.4-58.2 63.4-102 63.4s-83.1-25-102-63.4c-10.3-21.1-40.6-21.1-51 0-18.8 38.4-58.2 63.4-102 63.4-44.8 0-83.7-26-102-63.4-11.3-20.8-39.6-20.8-27.7 7.4 21.9 49.4 71.8 84.1 129.8 84.1 44.4 0 84.2-20.4 110.2-52.2 17.3-18 17.3-18 34.7 0 25.6 31.8 65.3 52.2 109.8 52.2zM597.7 304.1v-56.7c-0.3-15.3-12.7-27.6-28.1-27.6-15.5 0-28.1 12.6-28.1 28.1 0 0 0 28.1-28.1 28.1s-28.1-28.1-28.1-28.1c0-46.5 37.7-84.3 84.3-84.3 46.5 0 84.3 37.7 84.3 84.3v332.5c8.9-8.8 16.5-19.1 22.1-30.7 10.3-21.1 40.6-21.1 51 0 18.8 38.4 58.2 63.4 102 63.4 44.8 0 83.7-26 102-63.4 11.3-20.8 39.6-20.8 27.7 7.4-21.9 49.4-71.8 84.1-129.8 84.1-44.4 0-84.2-20.4-110.2-52.2-17.3-18-17.3-18-34.7 0-26 31.8-65.7 52.2-110.2 52.2-44.4 0-84.2-20.4-110.2-52.2-17.3-18-17.3-18-34.7 0-26 31.8-65.7 52.2-110.2 52.2-44.4 0-84.2-20.4-110.2-52.2-17.3-18-17.3-18-34.7 0-26 31.8-65.7 52.2-110.2 52.2v-28.1c43.8 0 83.1-25 102-63.4 10.3-21.1 40.6-21.1 51 0 18.8 38.4 58.2 63.4 102 63.4 31.7 0 61.1-13.1 82.1-34.9V247.5c-0.3-15.3-12.7-27.6-28.1-27.6-15.5 0-28.1 12.6-28.1 28.1 0 0 0 28.1-28.1 28.1S288.7 248 288.7 248c0-46.5 37.7-84.3 84.3-84.3 46.5 0 84.3 37.7 84.3 84.3v56.2l140.4-0.1z" fill="#5E676F" /><path d="M457.3 360.3h140.4v56.2H457.3zM457.3 472.7h140.4v56.2H457.3zM597.7 610.7V585H499c20.3 17.7 46.7 28.1 75 28.1 8.1 0 16-0.8 23.7-2.4z" fill='#000000'/>
                </g>
            }
            { icon === 8 &&
                <g>
                    <path d="M14.5714 15.0036L15.4286 16.8486C15.4286 16.8486 19.2857 17.6678 19.2857 19.6162C19.2857 21 17.5714 21 17.5714 21H13L10.75 19.75" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9.42864 15.0036L8.5715 16.8486C8.5715 16.8486 4.71436 17.6678 4.71436 19.6162C4.71436 21 6.42864 21 6.42864 21H8.50007L10.7501 19.75L13.5001 18" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M3 15.9261C3 15.9261 5.14286 15.4649 6.42857 15.0036C7.71429 8.54595 11.5714 9.00721 12 9.00721C12.4286 9.00721 16.2857 8.54595 17.5714 15.0036C18.8571 15.4649 21 15.9261 21 15.9261" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 7C13.1046 7 14 6.10457 14 5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5C10 6.10457 10.8954 7 12 7Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
            }
        </svg>
    )
}

export default DefaultIcon