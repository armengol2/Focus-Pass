'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Check, ChevronDown, CircleHelp, FileText, LockKeyhole, MapPin, ShieldCheck, UserRound } from 'lucide-react';

const steps = [
  { title: 'Informações pessoais', short: 'Pessoais', icon: UserRound },
  { title: 'Documentação', short: 'Documentos', icon: FileText },
  { title: 'Dados complementares', short: 'Complementares', icon: MapPin },
];
const ufs = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

type FieldProps = { label: string; placeholder?: string; type?: string; hint?: string; required?: boolean; full?: boolean };

function Field({ label, placeholder, type = 'text', hint, required = true, full }: FieldProps) {
  return <label className={full ? 'field field-full' : 'field'}><span>{label}{required && <b aria-hidden="true">*</b>}</span><input type={type} placeholder={placeholder} />{hint && <small>{hint}</small>}</label>;
}

function SelectField({ label, children, required = true, full = false }: { label: string; children: React.ReactNode; required?: boolean; full?: boolean }) {
  return <label className={full ? 'field field-full' : 'field'}><span>{label}{required && <b aria-hidden="true">*</b>}</span><span className="select-wrap"><select defaultValue=""><option value="" disabled>Selecione</option>{children}</select><ChevronDown aria-hidden="true" size={18} /></span></label>;
}

function RadioGroup({ label, options }: { label: string; options: string[] }) {
  return <fieldset className="field field-full radio-field"><legend>{label}<b aria-hidden="true">*</b></legend><div className="radio-row">{options.map((option) => <label key={option}><input type="radio" name={label} /><span>{option}</span></label>)}</div></fieldset>;
}

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const stepperRef = useRef<HTMLElement>(null);

  function goToStep(nextStep: number) {
    setCurrentStep(Math.max(0, Math.min(steps.length - 1, nextStep)));
    window.requestAnimationFrame(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      stepperRef.current?.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    });
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#" aria-label="Focus Vistos - início"><Image src="/focus-vistos-logo.png" width={160} height={175} alt="Focus Vistos" priority /><span><strong>Focus Vistos</strong><small>Assessoria de viagens</small></span></a>
        <div className="secure-label"><LockKeyhole size={16} /> Ambiente seguro</div>
        <button className="help-button" type="button" title="Central de ajuda"><CircleHelp size={20} /><span>Ajuda</span></button>
      </header>

      <section className="intro">
        <div><p className="eyebrow">Focus Vistos apresenta</p><h1>Focus<span>Pass</span></h1><p className="service-title">Solicitação assistida de passaporte</p><p>Preencha as informações com atenção. Você poderá revisar tudo antes de concluir.</p></div>
        <div className="privacy-note"><ShieldCheck size={21} /><span>Atendimento Focus Vistos. Seus dados são protegidos e usados somente nesta solicitação.</span></div>
      </section>

      <nav ref={stepperRef} className="stepper" aria-label="Etapas do formulário">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const complete = index < currentStep;
          return <button type="button" key={step.title} className={`${index === currentStep ? 'active' : ''} ${complete ? 'complete' : ''}`} onClick={() => goToStep(index)} aria-current={index === currentStep ? 'step' : undefined}><span className="step-number">{complete ? <Check size={17} /> : <Icon size={18} />}</span><span><small>Etapa {index + 1}</small><strong className="desktop-title">{step.title}</strong><strong className="mobile-title">{step.short}</strong></span></button>;
        })}
      </nav>

      <form className="form-shell" onSubmit={(event) => event.preventDefault()}>
        {currentStep === 0 && <section className="form-section">
          <div className="section-heading"><span>01</span><div><h2>Informações pessoais</h2><p>Informe os dados conforme constam nos documentos oficiais.</p></div></div>
          <div className="form-grid">
            <Field label="Nome completo" placeholder="Digite o nome completo" full />
            <RadioGroup label="Sexo" options={['Masculino', 'Feminino', 'Não especificado']} />
            <Field label="Filiação 1" placeholder="Nome completo" />
            <SelectField label="Sexo da filiação 1"><option>Masculino</option><option>Feminino</option><option>Não especificado</option></SelectField>
            <Field label="Filiação 2" placeholder="Nome completo" required={false} />
            <SelectField label="Sexo da filiação 2" required={false}><option>Masculino</option><option>Feminino</option><option>Não especificado</option></SelectField>
            <Field label="Data de nascimento" placeholder="DD/MM/AAAA" />
            <SelectField label="Raça ou cor"><option>Amarela</option><option>Branca</option><option>Parda</option><option>Indígena</option><option>Preta</option><option>Outras</option></SelectField>
            <SelectField label="Nacionalidade"><option>Brasileira</option><option>Outra</option></SelectField>
            <SelectField label="UF de nascimento">{ufs.map((uf) => <option key={uf}>{uf}</option>)}</SelectField>
            <SelectField label="Cidade de nascimento" full><option>Selecione primeiro a UF</option></SelectField>
          </div>
          <div className="subsection"><h3>Nome anterior</h3><p>Preencha somente se já houve alteração no nome.</p></div>
          <div className="form-grid"><Field label="Nome anterior" placeholder="Digite o nome anterior" required={false} /><SelectField label="Motivo da mudança" required={false}><option>Mudança por estado civil</option><option>Decisão judicial</option><option>Outros motivos</option></SelectField></div>
        </section>}

        {currentStep === 1 && <section className="form-section">
          <div className="section-heading"><span>02</span><div><h2>Documentação</h2><p>Tenha seus documentos em mãos para evitar divergências.</p></div></div>
          <div className="subsection first"><h3>Documento de identidade</h3><p>Informe os dados do RG ou documento equivalente.</p></div>
          <div className="form-grid"><Field label="Número do documento" placeholder="Somente números" /><Field label="Data de emissão" placeholder="DD/MM/AAAA" /><Field label="Órgão emissor" placeholder="Ex.: SSP" /><SelectField label="UF de expedição">{ufs.map((uf) => <option key={uf}>{uf}</option>)}</SelectField></div>
          <div className="subsection"><h3>CPF</h3><p>Digite apenas os números.</p></div>
          <div className="form-grid"><Field label="CPF" placeholder="000.000.000-00" /><Field label="CPF do responsável" placeholder="000.000.000-00" required={false} hint="Necessário para requerentes menores de idade." /></div>
          <div className="subsection"><h3>Certidão de nascimento</h3></div>
          <div className="form-grid"><Field label="Matrícula da certidão" placeholder="32 dígitos" required={false} full /><Field label="Cartório" placeholder="Nome do cartório" required={false} /><SelectField label="UF do cartório" required={false}>{ufs.map((uf) => <option key={uf}>{uf}</option>)}</SelectField><SelectField label="Cidade do cartório" required={false} full><option>Selecione primeiro a UF</option></SelectField></div>
          <div className="subsection"><h3>Passaporte anterior</h3></div>
          <div className="form-grid"><SelectField label="Situação do passaporte anterior" full><option>Nunca teve</option><option>Anterior válido</option><option>Anterior vencido</option></SelectField><Field label="Série" placeholder="AA" required={false} /><Field label="Número" placeholder="000000" required={false} /></div>
        </section>}

        {currentStep === 2 && <section className="form-section">
          <div className="section-heading"><span>03</span><div><h2>Dados complementares</h2><p>Complete os dados profissionais e de contato do requerente.</p></div></div>
          <div className="subsection first"><h3>Profissão e contato</h3></div>
          <div className="form-grid"><Field label="Profissão" placeholder="Outras ocupações não especificadas anteriormente" full /><Field label="Outra profissão" placeholder="Digite sua profissão" full /><Field label="E-mail" placeholder="nome@exemplo.com" type="email" /><Field label="Confirmação do e-mail" placeholder="Repita seu e-mail" type="email" /></div>
          <div className="subsection"><h3>Endereço do requerente</h3></div>
          <div className="form-grid"><SelectField label="País"><option>Brasil</option><option>Outro</option></SelectField><Field label="CEP" placeholder="00000-000" /><SelectField label="UF">{ufs.map((uf) => <option key={uf}>{uf}</option>)}</SelectField><SelectField label="Cidade"><option>Selecione primeiro a UF</option></SelectField><Field label="Logradouro" placeholder="Rua, avenida, travessa..." full /><Field label="Distrito ou bairro" placeholder="Digite o bairro" full /><Field label="DDD" placeholder="00" /><Field label="Telefone" placeholder="00000-0000" /></div>
        </section>}

        <footer className="form-actions"><button type="button" className="button secondary" disabled={currentStep === 0} onClick={() => goToStep(currentStep - 1)}><ArrowLeft size={18} /> Voltar</button><span>Etapa {currentStep + 1} de {steps.length}</span><button type="button" className="button primary" onClick={() => goToStep(currentStep + 1)}>{currentStep === 2 ? 'Revisar dados' : 'Continuar'} <ArrowRight size={18} /></button></footer>
      </form>
      <footer className="page-footer"><span className="footer-brand"><Image src="/focus-vistos-logo.png" width={160} height={175} alt="Focus Vistos" /><span><strong>Focus Vistos</strong><small>FocusPass, solicitação assistida</small></span></span><span>Privacidade</span><span>Termos de uso</span><span>© 2026 Focus Vistos</span></footer>
    </main>
  );
}
