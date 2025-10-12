// ============================================
// CÁLCULO DE FRETE
// ============================================
function calcularFrete() {
  const peso = parseFloat(document.getElementById("peso").value) || 0
  const distancia = parseFloat(document.getElementById("distancia").value) || 0

  const custoPeso = (peso * 2).toFixed(2)
  const custoDistancia = (distancia * 0.1).toFixed(2)
  const total = (10 + parseFloat(custoPeso) + parseFloat(custoDistancia)).toFixed(2)

  document.querySelector('output[name="custoPeso"]').textContent = custoPeso.replace(".", ",")
  document.querySelector('output[name="custoDistancia"]').textContent = custoDistancia.replace(".", ",")
  document.querySelector('output[name="total"]').textContent = total.replace(".", ",")
}

// ============================================
// ATUALIZAR RANGE DISPLAY
// ============================================
function inicializarRanges() {
  const volume = document.getElementById("volume")
  const brilho = document.getElementById("brilho")

  if (volume) {
    volume.addEventListener("input", function () {
      const output = this.parentElement.querySelector("output")
      if (output) {
        output.textContent = this.value
      }
    })
  }

  if (brilho) {
    brilho.addEventListener("input", function () {
      const output = this.parentElement.querySelector("output")
      if (output) {
        output.textContent = this.value
      }
    })
  }
}

// ============================================
// HABILITAR CAMPOS CONDICIONAIS
// ============================================
function habilitarCampos() {
  const servico = document.querySelector('input[name="servico"]:checked')?.value

  const camposWeb = document.getElementById("campos-web")
  const camposMobile = document.getElementById("campos-mobile")
  const camposDados = document.getElementById("campos-dados")

  if (camposWeb) camposWeb.style.display = servico === "web" ? "block" : "none"
  if (camposMobile) camposMobile.style.display = servico === "mobile" ? "block" : "none"
  if (camposDados) camposDados.style.display = servico === "dados" ? "block" : "none"
}

// ============================================
// VALIDAÇÃO DO FORMULÁRIO DE CADASTRO
// ============================================
function inicializarValidacaoCadastro() {
  const cadastroForm = document.getElementById("cadastroForm")

  if (cadastroForm) {
    cadastroForm.addEventListener("submit", function (e) {
      const senha = document.getElementById("senha").value
      const confirmaSenha = document.getElementById("confirmaSenha").value

      if (senha !== confirmaSenha) {
        e.preventDefault()
        alert("❌ As senhas não conferem! Por favor, verifique.")
        return false
      }

      if (senha.length < 8) {
        e.preventDefault()
        alert("❌ A senha deve ter no mínimo 8 caracteres.")
        return false
      }
    })
  }
}

// ============================================
// FORMATAÇÃO DE CAMPOS
// ============================================
function formatarCPF(input) {
  let value = input.value.replace(/\D/g, "")

  if (value.length > 11) {
    value = value.slice(0, 11)
  }

  value = value.replace(/(\d{3})(\d)/, "$1.$2")
  value = value.replace(/(\d{3})(\d)/, "$1.$2")
  value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2")

  input.value = value
}

function formatarTelefone(input) {
  let value = input.value.replace(/\D/g, "")

  if (value.length > 11) {
    value = value.slice(0, 11)
  }

  value = value.replace(/(\d{2})(\d)/, "($1) $2")
  value = value.replace(/(\d{5})(\d)/, "$1-$2")

  input.value = value
}

function formatarCEP(input) {
  let value = input.value.replace(/\D/g, "")

  if (value.length > 8) {
    value = value.slice(0, 8)
  }

  value = value.replace(/(\d{5})(\d)/, "$1-$2")

  input.value = value
}

// ============================================
// INICIALIZAR FORMATADORES
// ============================================
function inicializarFormatadores() {
  const cpfInputs = document.querySelectorAll('input[pattern*="[0-9]{3}\\\\.[0-9]{3}\\\\.[0-9]{3}"]')
  const telefoneInputs = document.querySelectorAll('input[type="tel"]')
  const cepInputs = document.querySelectorAll('input[name*="cep"]')

  cpfInputs.forEach(input => {
    input.addEventListener("input", function () {
      formatarCPF(this)
    })
  })

  telefoneInputs.forEach(input => {
    input.addEventListener("input", function () {
      formatarTelefone(this)
    })
  })

  cepInputs.forEach(input => {
    input.addEventListener("input", function () {
      formatarCEP(this)
    })
  })
}

// ============================================
// VALIDAÇÃO EM TEMPO REAL
// ============================================
function inicializarValidacaoTempoReal() {
  const inputs = document.querySelectorAll("input, textarea, select")

  inputs.forEach(input => {
    input.addEventListener("blur", function () {
      if (!this.checkValidity()) {
        this.classList.add("invalid")
      } else {
        this.classList.remove("invalid")
      }
    })

    input.addEventListener("input", function () {
      if (this.checkValidity()) {
        this.classList.remove("invalid")
      }
    })
  })
}

// ============================================
// HABILITAR/DESABILITAR CAMPOS DINAMICAMENTE
// ============================================
function inicializarCamposDinamicos() {
  const ativarCampo = document.getElementById("ativar-campo")

  if (ativarCampo) {
    ativarCampo.addEventListener("change", function () {
      const campoDinamico = document.getElementById("campo-dinamico")
      if (campoDinamico) {
        campoDinamico.disabled = !this.checked
        if (!this.checked) {
          campoDinamico.value = ""
        }
      }
    })
  }
}

// ============================================
// TOOLTIP DE INFORMAÇÕES
// ============================================
function inicializarTooltips() {
  const inputs = document.querySelectorAll("input[title]")

  inputs.forEach(input => {
    input.addEventListener("invalid", function (e) {
      e.preventDefault()
      if (!this.checkValidity()) {
        this.setAttribute("data-invalid", "true")
      }
    })

    input.addEventListener("input", function () {
      this.removeAttribute("data-invalid")
    })
  })
}

// ============================================
// ENVIO DE FORMULÁRIO COM FEEDBACK
// ============================================
function inicializarEnvioFormularios() {
  const forms = document.querySelectorAll("form")

  forms.forEach(form => {
    form.addEventListener("submit", function (e) {
      // Prevenir envio padrão para demonstração
      if (!form.id.includes("real")) {
        e.preventDefault()

        const nomeFormulario = form.id || "Formulário"
        alert(`✅ ${nomeFormulario} validado com sucesso!\n\nEm produção, seria enviado para o servidor.`)

        console.log("Dados do formulário:", new FormData(form))
      }
    })
  })
}

// ============================================
// INICIALIZAR TUDO AO CARREGAR A PÁGINA
// ============================================
document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ Inicializando aplicação de formulários HTML5...")

  // Inicializar todas as funcionalidades
  inicializarRanges()
  inicializarValidacaoCadastro()
  inicializarFormatadores()
  inicializarValidacaoTempoReal()
  inicializarCamposDinamicos()
  inicializarTooltips()
  inicializarEnvioFormularios()

  // Calcular frete ao iniciar
  calcularFrete()

  console.log("✅ Aplicação inicializada com sucesso!")
})

// ============================================
// FUNÇÃO AUXILIAR DE VALIDAÇÃO CUSTOMIZADA
// ============================================
function validarFormulario(formId) {
  const form = document.getElementById(formId)

  if (!form) {
    console.error(`Formulário com ID "${formId}" não encontrado`)
    return false
  }

  const inputs = form.querySelectorAll("input, textarea, select")
  let isValid = true

  inputs.forEach(input => {
    if (!input.checkValidity()) {
      isValid = false
      input.classList.add("invalid")
      console.warn(`Campo inválido: ${input.name || input.id}`)
    }
  })

  return isValid
}

// ============================================
// OBTER DADOS DO FORMULÁRIO
// ============================================
function obterDadosFormulario(formId) {
  const form = document.getElementById(formId)

  if (!form) {
    console.error(`Formulário com ID "${formId}" não encontrado`)
    return null
  }

  const formData = new FormData(form)
  const dados = {}

  formData.forEach((value, key) => {
    if (dados[key]) {
      if (Array.isArray(dados[key])) {
        dados[key].push(value)
      } else {
        dados[key] = [dados[key], value]
      }
    } else {
      dados[key] = value
    }
  })

  return dados
}

// ============================================
// LIMPAR FORMULÁRIO
// ============================================
function limparFormulario(formId) {
  const form = document.getElementById(formId)

  if (form) {
    form.reset()
    form.querySelectorAll("input, textarea").forEach(input => {
      input.classList.remove("invalid")
    })
  }
}

// ============================================
// PREENCHER FORMULÁRIO COM DADOS
// ============================================
function preencherFormulario(formId, dados) {
  const form = document.getElementById(formId)

  if (!form) {
    console.error(`Formulário com ID "${formId}" não encontrado`)
    return
  }

  Object.keys(dados).forEach(key => {
    const input = form.elements[key]
    if (input) {
      input.value = dados[key]
    }
  })
}

// ============================================
// EXPORTAR DADOS COMO JSON
// ============================================
function exportarComoJSON(formId) {
  const dados = obterDadosFormulario(formId)

  if (!dados) return

  const jsonString = JSON.stringify(dados, null, 2)
  const blob = new Blob([jsonString], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")

  a.href = url
  a.download = `formulario-${formId}-${new Date().getTime()}.json`
  a.click()

  URL.revokeObjectURL(url)
  console.log("✅ Arquivo JSON exportado com sucesso!")
}

// ============================================
// EXPORTAR DADOS COMO CSV
// ============================================
function exportarComoCSV(formId) {
  const dados = obterDadosFormulario(formId)

  if (!dados) return

  const headers = Object.keys(dados)
  const values = headers.map(header => {
    const value = dados[header]
    const stringValue = Array.isArray(value) ? value.join("; ") : String(value)
    return `"${stringValue.replace(/"/g, '""')}"`
  })

  const csvContent = [headers.join(","), values.join(",")].join("\n")
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")

  a.href = url
  a.download = `formulario-${formId}-${new Date().getTime()}.csv`
  a.click()

  URL.revokeObjectURL(url)
  console.log("✅ Arquivo CSV exportado com sucesso!")
}

// ============================================
// VALIDAÇÃO CUSTOMIZADA DE EMAIL
// ============================================
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

// ============================================
// VALIDAÇÃO CUSTOMIZADA DE SENHA FORTE
// ============================================
function validarSenhaForte(senha) {
  const temMaiscula = /[A-Z]/.test(senha)
  const temMinuscula = /[a-z]/.test(senha)
  const temNumero = /[0-9]/.test(senha)
  const temEspecial = /[!@#$%^&*]/.test(senha)
  const temComprimento = senha.length >= 8

  return {
    forte: temMaiscula && temMinuscula && temNumero && temEspecial && temComprimento,
    detalhes: {
      maiuscula: temMaiscula,
      minuscula: temMinuscula,
      numero: temNumero,
      especial: temEspecial,
      comprimento: temComprimento,
    },
  }
}

// ============================================
// MOSTRAR REQUISITOS DE SENHA
// ============================================
function inicializarValidacaoSenha() {
  const senhaInput = document.getElementById("senha")

  if (!senhaInput) return

  senhaInput.addEventListener("input", function () {
    const validacao = validarSenhaForte(this.value)

    if (this.value.length > 0) {
      console.log("Validação de Senha:", validacao.detalhes)
    }
  })
}

// ============================================
// VERIFICAR DISPONIBILIDADE (SIMULADO)
// ============================================
function verificarDisponibilidade(tipo, valor) {
  return new Promise(resolve => {
    setTimeout(() => {
      const usuariosOcupados = ["admin", "user", "teste", "root"]
      const emailsOcupados = ["teste@email.com", "admin@empresa.com"]

      if (tipo === "usuario") {
        resolve(!usuariosOcupados.includes(valor.toLowerCase()))
      } else if (tipo === "email") {
        resolve(!emailsOcupados.includes(valor.toLowerCase()))
      } else {
        resolve(true)
      }
    }, 500)
  })
}

// ============================================
// LIMITAR TAMANHO DE ARQUIVO
// ============================================
function validarTamanhoArquivo(input, maxMB) {
  const arquivo = input.files[0]

  if (!arquivo) return true

  const maxBytes = maxMB * 1024 * 1024

  if (arquivo.size > maxBytes) {
    alert(`❌ Arquivo muito grande! Máximo: ${maxMB}MB. Tamanho: ${(arquivo.size / 1024 / 1024).toFixed(2)}MB`)
    input.value = ""
    return false
  }

  return true
}

// ============================================
// CONTAR CARACTERES
// ============================================
function inicializarContadorCaracteres() {
  const textareas = document.querySelectorAll("textarea")

  textareas.forEach(textarea => {
    // Criar elemento de contador se não existir
    const contador = document.createElement("div")
    contador.className = "char-counter"
    contador.style.cssText = "font-size: 12px; color: #999; margin-top: 5px;"
    textarea.parentElement.appendChild(contador)

    // Atualizar contador ao digitar
    textarea.addEventListener("input", function () {
      const maxlength = this.getAttribute("maxlength")
      const comprimento = this.value.length

      if (maxlength) {
        contador.textContent = `${comprimento}/${maxlength} caracteres`
      } else {
        contador.textContent = `${comprimento} caracteres`
      }
    })

    // Atualizar inicial
    textarea.dispatchEvent(new Event("input"))
  })
}

// ============================================
// DETECTAR MUDANÇAS NÃO SALVAS
// ============================================
function inicializarDeteccaoMudancas() {
  const forms = document.querySelectorAll("form")

  forms.forEach(form => {
    let mudancasNaoSalvas = false

    const inputs = form.querySelectorAll("input, textarea, select")
    const valoresOriginais = {}

    // Guardar valores originais
    inputs.forEach(input => {
      valoresOriginais[input.name || input.id] = input.value
    })

    // Detectar mudanças
    inputs.forEach(input => {
      input.addEventListener("change", function () {
        mudancasNaoSalvas = true
      })
    })

    // Avisar ao sair
    form.addEventListener("submit", function () {
      mudancasNaoSalvas = false
    })

    window.addEventListener("beforeunload", function (e) {
      if (mudancasNaoSalvas) {
        e.preventDefault()
        e.returnValue = ""
        return ""
      }
    })
  })
}

// ============================================
// MODO ESCURO (OPCIONAL)
// ============================================
function inicializarModoEscuro() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)")

  if (prefersDark.matches) {
    document.body.style.backgroundColor = "#1a1a1a"
    document.body.style.color = "#ffffff"
  }

  prefersDark.addEventListener("change", e => {
    if (e.matches) {
      document.body.style.backgroundColor = "#1a1a1a"
      document.body.style.color = "#ffffff"
    } else {
      document.body.style.backgroundColor = ""
      document.body.style.color = ""
    }
  })
}

// ============================================
// LOGGER DE EVENTOS
// ============================================
function habilitarLoggerFormularios() {
  const forms = document.querySelectorAll("form")

  forms.forEach(form => {
    form.addEventListener("submit", function (e) {
      console.log(`📝 Formulário submetido: ${this.id || "sem-id"}`)
      console.log("Dados:", obterDadosFormulario(this.id))
    })

    form.addEventListener("reset", function (e) {
      console.log(`🔄 Formulário resetado: ${this.id || "sem-id"}`)
    })

    const inputs = form.querySelectorAll("input, textarea, select")
    inputs.forEach(input => {
      input.addEventListener("focus", function () {
        console.log(`📌 Foco no campo: ${this.name || this.id}`)
      })

      input.addEventListener("blur", function () {
        console.log(`❌ Foco removido do campo: ${this.name || this.id}`)
      })
    })
  })
}

// ============================================
// REINICIALIZAR TUDO COM NOVAS FUNÇÕES
// ============================================
document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ Inicializando aplicação de formulários HTML5...")

  // Funcionalidades principais
  inicializarRanges()
  inicializarValidacaoCadastro()
  inicializarFormatadores()
  inicializarValidacaoTempoReal()
  inicializarCamposDinamicos()
  inicializarTooltips()
  inicializarEnvioFormularios()

  // Funcionalidades adicionais
  inicializarValidacaoSenha()
  inicializarContadorCaracteres()
  inicializarDeteccaoMudancas()
  inicializarModoEscuro()
  habilitarLoggerFormularios()

  // Calcular frete ao iniciar
  calcularFrete()

  console.log("✅ Aplicação inicializada com todas as funcionalidades!")
  console.log("📖 Use as funções disponíveis no console para testes avançados")
})
