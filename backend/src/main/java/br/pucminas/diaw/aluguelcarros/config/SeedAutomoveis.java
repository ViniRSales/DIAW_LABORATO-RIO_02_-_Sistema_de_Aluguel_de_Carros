package br.pucminas.diaw.aluguelcarros.config;

import br.pucminas.diaw.aluguelcarros.model.Automovel;
import br.pucminas.diaw.aluguelcarros.model.TipoProprietario;
import br.pucminas.diaw.aluguelcarros.repository.AutomovelRepository;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Popula a frota de automoveis na inicializacao, caso a tabela esteja vazia.
 * A frota foi inspirada nas categorias tipicas de locadoras brasileiras
 * (economico, intermediario, SUV, premium), usando modelos de veiculos reais.
 */
@Configuration
public class SeedAutomoveis {

    @Bean
    CommandLineRunner popularAutomoveis(AutomovelRepository repository) {
        return args -> {
            if (repository.count() > 0) {
                return;
            }

            List<Automovel> frota = List.of(
                    criar("Mobi", "Fiat", 2024, "FRT0001", "Econômico", "79.90", TipoProprietario.EMPRESA),
                    criar("Kwid", "Renault", 2024, "FRT0002", "Econômico", "84.90", TipoProprietario.EMPRESA),
                    criar("Onix", "Chevrolet", 2024, "FRT0003", "Intermediário", "109.90", TipoProprietario.EMPRESA),
                    criar("HB20", "Hyundai", 2024, "FRT0004", "Intermediário", "114.90", TipoProprietario.EMPRESA),
                    criar("Argo", "Fiat", 2023, "FRT0005", "Intermediário", "104.90", TipoProprietario.EMPRESA),
                    criar("Virtus", "Volkswagen", 2024, "FRT0006", "Sedã", "139.90", TipoProprietario.EMPRESA),
                    criar("Corolla", "Toyota", 2024, "FRT0007", "Sedã Premium", "219.90", TipoProprietario.BANCO),
                    criar("Creta", "Hyundai", 2024, "FRT0008", "SUV", "189.90", TipoProprietario.EMPRESA),
                    criar("Compass", "Jeep", 2023, "FRT0009", "SUV Premium", "259.90", TipoProprietario.BANCO),
                    criar("Strada", "Fiat", 2024, "FRT0010", "Utilitário", "149.90", TipoProprietario.EMPRESA),
                    criar("Polo", "Volkswagen", 2024, "FRT0011", "Intermediário", "124.90", TipoProprietario.EMPRESA),
                    criar("T-Cross", "Volkswagen", 2024, "FRT0012", "SUV", "199.90", TipoProprietario.EMPRESA)
            );

            repository.saveAll(frota);
        };
    }

    private Automovel criar(String modelo, String marca, int ano, String placa,
                            String categoria, String diaria, TipoProprietario proprietario) {
        Automovel a = new Automovel();
        a.setModelo(modelo);
        a.setMarca(marca);
        a.setAno(ano);
        a.setPlaca(placa);
        a.setMatricula("MAT-" + placa);
        a.setCategoria(categoria);
        a.setValorDiaria(new BigDecimal(diaria));
        a.setTipoProprietario(proprietario);
        return a;
    }
}
