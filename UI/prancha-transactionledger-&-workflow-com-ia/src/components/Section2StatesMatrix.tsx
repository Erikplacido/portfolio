import React, { useState } from 'react';
import { 
  Grid3X3, 
  MousePointer, 
  Keyboard, 
  AlertTriangle, 
  Globe2, 
  Type, 
  HelpCircle,
  Play,
  Sliders,
  CheckCircle,
  XCircle,
  ExternalLink
} from 'lucide-react';
import { TransactionRowItem } from './TransactionRowItem';
import { TransactionItem, InteractiveState } from '../types';

export const Section2StatesMatrix: React.FC = () => {
  // Simulator state
  const [testMerchantName, setTestMerchantName] = useState(
    'Amazon Web Services Serviços de Nuvem e Servidores Brasil Ltda'
  );
  const [testStatus, setTestStatus] = useState<'approved' | 'pending' | 'declined' | 'refunded'>('approved');
  const [testDeclineReason, setTestDeclineReason] = useState('Cartão bloqueado');
  const [testIsInternational, setTestIsInternational] = useState(false);
  const [testInteractiveState, setTestInteractiveState] = useState<InteractiveState>('default');
  const [testAmount, setTestAmount] = useState(-420.00);

  // 1. Column 1 Base Item: Compra Internacional
  const internationalTx: TransactionItem = {
    id: 'matrix_col1_intl',
    merchantName: 'AWS Cloud Computing USA',
    merchantCategory: 'cloud',
    cardholderName: 'Lucas Ferreira',
    cardLastDigits: '8841',
    costCenter: { code: 'CC-401', name: 'Infraestrutura' },
    amount: -442.10,
    currency: 'BRL',
    status: 'approved',
    date: '12/09/2026',
    time: '14:22',
    isInternational: true,
    foreignExchange: {
      originalAmount: 80.00,
      originalCurrency: 'USD',
      exchangeRate: 5.20,
      iofPercentage: 4.38,
      iofAmount: 18.25,
      spreadPercentage: 2.0,
      finalBrlAmount: 442.10
    },
    accessibilityLabel: 'Transação internacional em AWS Cloud Computing USA, valor US$ 80.00 convertido para R$ 442,10 com IOF 4.38% e spread bancário, status conciliado',
    receiptAttached: true
  };

  // 2. Column 2 Base Item: Transação Recusada/Estornada
  const declinedTx: TransactionItem = {
    id: 'matrix_col2_declined',
    merchantName: 'Kalunga Materiais Corporativos',
    merchantCategory: 'office',
    cardholderName: 'Carlos Eduardo Ramos',
    cardLastDigits: '1920',
    costCenter: { code: 'CC-105', name: 'Operações' },
    amount: -1150.00,
    currency: 'BRL',
    status: 'declined',
    declineReason: 'Saldo insuficiente',
    date: '11/09/2026',
    time: '16:48',
    isInternational: false,
    accessibilityLabel: 'Transação recusada em Kalunga Materiais Corporativos, valor de 1150 reais tachado, motivo saldo insuficiente na conta Conta Simples',
    receiptAttached: false
  };

  // 3. Column 3 Base Item: Texto Longo (>35 chars)
  const longTextTx: TransactionItem = {
    id: 'matrix_col3_long',
    merchantName: 'Amazon Web Services Serviços de Nuvem e Servidores Brasil Ltda',
    merchantCategory: 'cloud',
    cardholderName: 'Guilherme Medeiros',
    cardLastDigits: '7721',
    costCenter: { code: 'CC-405', name: 'DevOps & SRE' },
    amount: -420.00,
    currency: 'BRL',
    status: 'pending',
    date: '10/09/2026',
    time: '18:04',
    isInternational: false,
    accessibilityLabel: 'Transação em Amazon Web Services Serviços de Nuvem e Servidores Brasil Ltda, valor de 420 reais, status pendente, portador Guilherme Medeiros',
    receiptAttached: false
  };

  // The 4 interactive row states
  const stateRows: { state: InteractiveState; title: string; subtitle: string; spec: string }[] = [
    {
      state: 'default',
      title: '1. Estado Default (Repouso)',
      subtitle: 'Fundo neutro surface-base (#FFFFFF) com borda inferior de 1px',
      spec: 'bg: #FFFFFF • border-b: #E5E7EB'
    },
    {
      state: 'hover',
      title: '2. Estado Hover (Desktop)',
      subtitle: 'Fundo sutil #F8F9FA com transição de 150ms ease-out',
      spec: 'bg: #F8F9FA • cursor: pointer • 150ms transition'
    },
    {
      state: 'active',
      title: '3. Estado Active / Pressed',
      subtitle: 'Fundo #F1F3F5 ao pressionar com mouse ou toque na tela',
      spec: 'bg: #F1F3F5 • feedback tátil instantâneo'
    },
    {
      state: 'focus',
      title: '4. Estado Focus (Teclado a11y)',
      subtitle: 'Anel de foco azul de 2px visível (offset 2px) conforme WCAG 2.4.7',
      spec: 'ring: 2px #2563EB • offset: 2px #FFFFFF'
    }
  ];

  // Dynamic simulation transaction item
  const customSimulatorTx: TransactionItem = {
    id: 'simulated_custom_tx',
    merchantName: testMerchantName,
    merchantCategory: 'cloud',
    cardholderName: 'Ana Beatriz Souza',
    cardLastDigits: '9021',
    costCenter: { code: 'CC-204', name: 'Inovação & IA' },
    amount: testAmount,
    currency: 'BRL',
    status: testStatus,
    declineReason: testStatus === 'declined' ? testDeclineReason : undefined,
    date: '12/09/2026',
    time: '15:30',
    isInternational: testIsInternational,
    foreignExchange: testIsInternational ? {
      originalAmount: 80.00,
      originalCurrency: 'USD',
      exchangeRate: 5.20,
      iofPercentage: 4.38,
      iofAmount: 18.25,
      spreadPercentage: 2.0,
      finalBrlAmount: Math.abs(testAmount)
    } : undefined,
    accessibilityLabel: `Transação simulada em ${testMerchantName}, valor de ${Math.abs(testAmount)} reais, status ${testStatus}`,
    receiptAttached: true
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden" id="section-matrix">
      {/* Section Header */}
      <div className="px-6 py-5 border-b border-gray-200 bg-gray-50/50 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold">
              2
            </span>
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">
              Matriz de Estados e Casos Extremos (Edge Cases)
            </h2>
          </div>
          <p className="text-sm text-gray-500 mt-1 max-w-3xl">
            Grade visual de 4 linhas por 3 colunas cruzando todos os estados interativos (Default, Hover, Active, Focus) com variações críticas de negócio (Internacional, Recusado/Estornado, Texto Longo &gt;35 caracteres).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">
            <Grid3X3 size={14} />
            Matriz 4 × 3
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6 lg:p-8 space-y-10">
        
        {/* 4x3 Visual Matrix Grid Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[960px] border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs">
            
            {/* Table Header: Columns (Variações de Negócio Reais) */}
            <div className="grid grid-cols-12 bg-slate-50 border-b border-gray-200 text-xs font-bold text-gray-700">
              <div className="col-span-3 p-3.5 border-r border-gray-200 flex items-center gap-2 text-gray-900">
                <MousePointer size={14} className="text-blue-600" />
                <span>ESTADO INTERATIVO</span>
              </div>
              <div className="col-span-3 p-3.5 border-r border-gray-200 flex items-center gap-2 text-indigo-900 bg-indigo-50/50">
                <Globe2 size={14} className="text-indigo-600" />
                <span>1. COMPRA INTERNACIONAL</span>
                <span className="text-[10px] font-normal text-indigo-700 ml-auto bg-indigo-100/70 px-1.5 py-0.5 rounded">
                  USD + IOF
                </span>
              </div>
              <div className="col-span-3 p-3.5 border-r border-gray-200 flex items-center gap-2 text-red-900 bg-red-50/50">
                <AlertTriangle size={14} className="text-red-600" />
                <span>2. TRANS. RECUSADA / ESTORNO</span>
                <span className="text-[10px] font-normal text-red-700 ml-auto bg-red-100/70 px-1.5 py-0.5 rounded">
                  Tachado + Motivo
                </span>
              </div>
              <div className="col-span-3 p-3.5 flex items-center gap-2 text-emerald-900 bg-emerald-50/50">
                <Type size={14} className="text-emerald-600" />
                <span>3. TEXTO LONGO (&gt; 35 CHARS)</span>
                <span className="text-[10px] font-normal text-emerald-700 ml-auto bg-emerald-100/70 px-1.5 py-0.5 rounded">
                  Truncamento Seguro
                </span>
              </div>
            </div>

            {/* Matrix Rows: 4 Interactive States */}
            {stateRows.map((row, index) => (
              <div 
                key={row.state} 
                className={`grid grid-cols-12 border-b border-gray-200 last:border-b-0 ${
                  index % 2 === 1 ? 'bg-slate-50/30' : 'bg-white'
                }`}
              >
                {/* State Label Cell */}
                <div className="col-span-3 p-4 border-r border-gray-200 flex flex-col justify-center bg-gray-50/30">
                  <span className="font-bold text-gray-900 text-xs flex items-center gap-1.5">
                    {row.title}
                  </span>
                  <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                    {row.subtitle}
                  </p>
                  <code className="text-[10px] font-mono text-blue-700 mt-2 bg-blue-50 px-1.5 py-0.5 rounded self-start border border-blue-100">
                    {row.spec}
                  </code>
                </div>

                {/* Col 1: Compra Internacional */}
                <div className="col-span-3 p-2.5 border-r border-gray-200 flex items-center">
                  <div className="w-full">
                    <TransactionRowItem
                      transaction={internationalTx}
                      forcedState={row.state}
                      isCard={true}
                    />
                  </div>
                </div>

                {/* Col 2: Transação Recusada */}
                <div className="col-span-3 p-2.5 border-r border-gray-200 flex items-center">
                  <div className="w-full">
                    <TransactionRowItem
                      transaction={declinedTx}
                      forcedState={row.state}
                      isCard={true}
                    />
                  </div>
                </div>

                {/* Col 3: Texto Longo */}
                <div className="col-span-3 p-2.5 flex items-center">
                  <div className="w-full">
                    <TransactionRowItem
                      transaction={longTextTx}
                      forcedState={row.state}
                      isCard={true}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Edge Case Implementation Technical Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/40">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                A
              </span>
              <h4 className="font-bold text-indigo-950 text-sm">Regra Cambial Internacional</h4>
            </div>
            <p className="text-xs text-indigo-900 leading-relaxed">
              O valor original em moeda estrangeira (ex: <code className="bg-white px-1 py-0.5 rounded font-mono font-bold">US$ 80.00</code>) é exibido no subtítulo com a cotação de fechamento e percentual de IOF. O valor primário à direita mostra o débito final em BRL (<code className="bg-white px-1 py-0.5 rounded font-mono font-bold">R$ 442,10</code>) já consolidado na conta jurídica.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-red-100 bg-red-50/40">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center">
                B
              </span>
              <h4 className="font-bold text-red-950 text-sm">Tratamento de Recusa / Estorno</h4>
            </div>
            <p className="text-xs text-red-900 leading-relaxed">
              Transações não autorizadas possuem o valor tachado em cinza (<code className="bg-white px-1 py-0.5 rounded font-mono font-bold">line-through text-gray-400</code>). A pílula de status vermelha exibe diretamente o motivo específico ("Saldo insuficiente" ou "Cartão bloqueado") para evitar fricção no suporte ao cliente.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/40">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                C
              </span>
              <h4 className="font-bold text-emerald-950 text-sm">Alinhamento Estrito de Texto Longo</h4>
            </div>
            <p className="text-xs text-emerald-900 leading-relaxed">
              Quando a razão social excede 35 caracteres, o contêiner aplica <code className="bg-white px-1 py-0.5 rounded font-mono font-bold">truncate</code> com ellipsis. O Trailing Block financeiro possui <code className="bg-white px-1 py-0.5 rounded font-mono font-bold">flex-shrink: 0</code> e alinhamento à direita, garantindo que o valor tabular NUNCA seja empurrado para fora da tela.
            </p>
          </div>
        </div>

        {/* Live Simulator Playground: Test Edge Cases in Real Time */}
        <div className="p-6 rounded-xl border border-gray-200 bg-slate-50/80">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-200">
            <div>
              <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                <Sliders size={18} className="text-blue-600" />
                Laboratório Interativo de Casos Extremos (Simulador ao Vivo)
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Digite um texto com mais de 35 caracteres, mude os estados e simule cenários de negócio em tempo real.
              </p>
            </div>
            <span className="text-xs font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded font-semibold self-start md:self-auto">
              Caracteres: {testMerchantName.length} / 35+
            </span>
          </div>

          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Text Input */}
            <div className="lg:col-span-2">
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Nome do Estabelecimento (Teste de Truncamento)
              </label>
              <input
                type="text"
                value={testMerchantName}
                onChange={(e) => setTestMerchantName(e.target.value)}
                className="w-full text-xs font-mono px-3 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Digite o nome da empresa..."
              />
              <div className="flex items-center gap-2 mt-1.5 text-[11px] text-gray-500">
                <span>Sugestões rápidas:</span>
                <button
                  onClick={() => setTestMerchantName('Google Cloud Brasil Serviços de Internet Ltda')}
                  className="text-blue-600 hover:underline"
                >
                  Google Cloud Brasil (52 chars)
                </button>
                <span>•</span>
                <button
                  onClick={() => setTestMerchantName('Posto BR')}
                  className="text-blue-600 hover:underline"
                >
                  Posto BR (Curto)
                </button>
              </div>
            </div>

            {/* Status Select */}
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Status da Transação
              </label>
              <select
                value={testStatus}
                onChange={(e) => setTestStatus(e.target.value as any)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="approved">Conciliado (Aprovado)</option>
                <option value="pending">Pendente (Aguardando comprovante)</option>
                <option value="declined">Recusado (Com erro/motivo)</option>
                <option value="refunded">Estornado (Crédito na conta)</option>
              </select>

              {testStatus === 'declined' && (
                <div className="mt-2">
                  <select
                    value={testDeclineReason}
                    onChange={(e) => setTestDeclineReason(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 rounded border border-red-300 bg-red-50 text-red-800 outline-none font-medium"
                  >
                    <option value="Saldo insuficiente">Saldo insuficiente</option>
                    <option value="Cartão bloqueado">Cartão bloqueado</option>
                    <option value="Limite corporativo excedido">Limite corporativo excedido</option>
                    <option value="Suspeita de fraude">Suspeita de fraude</option>
                  </select>
                </div>
              )}
            </div>

            {/* Interactive State & Intl Toggles */}
            <div className="flex flex-col gap-2">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Forçar Estado Interativo
                </label>
                <select
                  value={testInteractiveState}
                  onChange={(e) => setTestInteractiveState(e.target.value as InteractiveState)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="default">Default</option>
                  <option value="hover">Hover (#F8F9FA)</option>
                  <option value="active">Active/Pressed (#F1F3F5)</option>
                  <option value="focus">Focus (Anel 2px a11y)</option>
                </select>
              </div>

              <label className="flex items-center gap-2 text-xs font-medium text-gray-700 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={testIsInternational}
                  onChange={(e) => setTestIsInternational(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Simular Compra Internacional (USD)</span>
              </label>
            </div>
          </div>

          {/* Component Live Render in Sandbox */}
          <div className="bg-white p-4 rounded-xl border border-gray-300 shadow-sm max-w-3xl mx-auto">
            <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase block mb-2">
              Preview do Componente Renderizado:
            </span>
            <TransactionRowItem
              transaction={customSimulatorTx}
              forcedState={testInteractiveState}
              isCard={true}
              onClick={() => {}}
            />
          </div>

          {/* Accessibility label string preview */}
          <div className="mt-4 p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-xs text-blue-900">
            <span className="font-bold flex items-center gap-1.5 mb-1 text-blue-950">
              <Keyboard size={14} />
              Rótulo para Leitor de Tela (aria-label dinâmico gerado):
            </span>
            <p className="font-mono text-[11px] text-blue-800 bg-white p-2 rounded border border-blue-100 select-all">
              "{customSimulatorTx.accessibilityLabel}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
