import { w as writable } from "./index.js";
function createConsultasStore() {
  const { subscribe, set, update: update2 } = writable([]);
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("inr_consultas");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const consultas = parsed.map((c) => ({
          ...c,
          data: new Date(c.data)
        }));
        set(consultas);
      } catch (e) {
        console.error("Erro ao carregar consultas:", e);
      }
    }
  }
  return {
    subscribe,
    adicionar: (consulta) => {
      const novaConsulta = {
        ...consulta,
        id: crypto.randomUUID(),
        data: /* @__PURE__ */ new Date()
      };
      update2((consultas) => {
        const novas = [novaConsulta, ...consultas];
        if (typeof window !== "undefined") {
          localStorage.setItem("inr_consultas", JSON.stringify(novas));
        }
        return novas;
      });
      return novaConsulta;
    },
    remover: (id) => {
      update2((consultas) => {
        const novas = consultas.filter((c) => c.id !== id);
        if (typeof window !== "undefined") {
          localStorage.setItem("inr_consultas", JSON.stringify(novas));
        }
        return novas;
      });
    },
    limpar: () => {
      set([]);
      if (typeof window !== "undefined") {
        localStorage.removeItem("inr_consultas");
      }
    }
  };
}
function createPerfilStore() {
  const defaultPerfil = {
    alvoMin: 2,
    alvoMax: 3,
    mgComprimido: 5
  };
  const { subscribe, set } = writable(defaultPerfil);
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("inr_perfil");
    if (stored) {
      try {
        set(JSON.parse(stored));
      } catch (e) {
        console.error("Erro ao carregar perfil:", e);
      }
    }
  }
  return {
    subscribe,
    atualizar: (perfil) => {
      update((atual) => {
        const novo = { ...atual, ...perfil };
        if (typeof window !== "undefined") {
          localStorage.setItem("inr_perfil", JSON.stringify(novo));
        }
        return novo;
      });
    },
    resetar: () => {
      set(defaultPerfil);
      if (typeof window !== "undefined") {
        localStorage.removeItem("inr_perfil");
      }
    }
  };
}
function createModoStore() {
  const { subscribe, set } = writable("paciente");
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("inr_modo");
    if (stored === "profissional") {
      set("profissional");
    }
  }
  return {
    subscribe,
    toggle: () => {
      update((modo) => {
        const novo = modo === "paciente" ? "profissional" : "paciente";
        if (typeof window !== "undefined") {
          localStorage.setItem("inr_modo", novo);
        }
        return novo;
      });
    },
    set: (modo) => {
      set(modo);
      if (typeof window !== "undefined") {
        localStorage.setItem("inr_modo", modo);
      }
    }
  };
}
const consultasStore = createConsultasStore();
const perfilStore = createPerfilStore();
const modoStore = createModoStore();
export {
  consultasStore as c,
  modoStore as m,
  perfilStore as p
};
