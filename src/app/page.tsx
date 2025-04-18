import Fade from './fade';
import Santi from './santi';
import './globals.css';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-start min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-albert-sans)]">
     <Santi/>
     <main className="pl-20">
      <div className="pb-8">
        <h1 className="text-[42px] font-[family-name:var(--font-source-serif-4)]">Evelyn Zane</h1>
      </div>
      <div className="pb-8">
      <Fade delay={0}>Computer Science with minors in Neuroscience and Cognitive Science</Fade>
      <Fade delay={800}>I&#39;m interested in engineering intelligence + consciousness</Fade>
      </div>
      <Fade delay={1600}>I&#39;ve worked at: </Fade>
      <div className="pt-2 ml-2 text-sm pb-8">
              <Fade delay={2400}>
                <li>Graphistry Inc., AI Engineering Intern</li>
              </Fade>
              <Fade delay={2500}>
              <li><a href="https://mila.quebec/en/directory/jian-tang" target="_blank">MILA - Quebec AI Insitute</a>, Research Intern under Dr. Jian Tang</li>
              </Fade>
              <Fade delay={2600}>
                <li>CORESPEQ Inc., Software Engineering Intern</li>
              </Fade>
              <Fade delay={2700}>
                <li>University of British Columbia, Research Intern under Dr. Chunping Dai</li>
              </Fade>
      </div>
      {/* <Fade delay={3800}>
        I&#39;m currently working on ... 
      </Fade> */}
     </main>
    </div>
  );
}
