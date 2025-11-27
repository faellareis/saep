CREATE TABLE tbl_usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Categorias
CREATE TABLE tbl_categorias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(200) NOT NULL,
    descricao TEXT
);

-- Produtos
CREATE TABLE tbl_eletronicos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    codigo VARCHAR(100) UNIQUE,
    categoria_id INT,
    fabricante VARCHAR(255),
    preco DECIMAL(10,2) NOT NULL,
    cor VARCHAR(100),
    processador VARCHAR(255),
    memoria_ram VARCHAR(50),
    armazenamento VARCHAR(50),
    tamanho_tela VARCHAR(50),
    sistema_operacional VARCHAR(100),

    ativo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (categoria_id) REFERENCES tbl_categorias(id)
);

-- Estoque
CREATE TABLE tbl_estoque (
    id INT PRIMARY KEY AUTO_INCREMENT,
    produto_id INT NOT NULL,
    quantidade_atual INT DEFAULT 0,
    quantidade_minima INT DEFAULT 3,
    localizacao VARCHAR(200),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (produto_id) REFERENCES tbl_eletronicos(id) ON DELETE CASCADE
);

-- Movimentação
CREATE TABLE tbl_movimentacoes_estoque (
    id INT PRIMARY KEY AUTO_INCREMENT,
    produto_id INT NOT NULL,
    tipo_movimentacao ENUM('ENTRADA', 'SAIDA') NOT NULL,
    quantidade INT NOT NULL,
    motivo VARCHAR(200),
    observacoes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (produto_id) REFERENCES tbl_eletronicos(id)
);

-- Usuário padrão
INSERT INTO tbl_usuario (username, password) VALUES
('admin', '123456');

-- Categorias
INSERT INTO tbl_categorias (nome, descricao) VALUES
('Smartphone', 'Celulares e smartphones'),
('Tablet', 'Tablets e iPads'),
('Notebook', 'Notebooks e ultrabooks'),
('Smart TV', 'Televisores inteligentes'),
('Acessórios', 'Capinhas, fones, carregadores etc');

-- Produtos
INSERT INTO tbl_eletronicos (nome, codigo, categoria_id, fabricante, preco, cor,
processador, memoria_ram, armazenamento, tamanho_tela, sistema_operacional)
VALUES
('Samsung Galaxy A54', 'SM-A54', 1, 'Samsung', 1699.90, 'Preto', 'Exynos 1380', '8GB', '128GB', '6.4"', 'Android'),
('iPhone 13', 'IP13-128', 1, 'Apple', 3499.90, 'Azul', 'A15 Bionic', '4GB', '128GB', '6.1"', 'iOS'),
('Notebook Lenovo IdeaPad 3', 'LN-IDEA3', 3, 'Lenovo', 2799.00, 'Cinza', 'Intel i5', '8GB', '256GB SSD', '15.6"', 'Windows 11');

-- Estoque inicial
INSERT INTO tbl_estoque (produto_id, quantidade_atual, quantidade_minima, localizacao)
VALUES
(1, 20, 5, 'Prateleira A-1'),
(2, 10, 3, 'Prateleira A-2'),
(3, 15, 4, 'Prateleira B-1');

-- Movimentação inicial
INSERT INTO tbl_movimentacoes_estoque (produto_id, tipo_movimentacao, quantidade, motivo)
VALUES
(1, 'ENTRADA', 20, 'Estoque inicial'),
(2, 'ENTRADA', 10, 'Estoque inicial'),
(3, 'ENTRADA', 15, 'Estoque inicial');
