<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231004225702 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE commercant (id INT NOT NULL, site_web VARCHAR(255) NOT NULL, lieu VARCHAR(255) NOT NULL, type_commerce VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE demande_echange (id INT AUTO_INCREMENT NOT NULL, utilisateur_id INT NOT NULL, echange_id INT NOT NULL, est_accepte TINYINT(1) NOT NULL, INDEX IDX_85805810FB88E14F (utilisateur_id), INDEX IDX_8580581013713818 (echange_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE echange (id INT AUTO_INCREMENT NOT NULL, produit_echange_id INT NOT NULL, utilisateur_id INT NOT NULL, produit_id INT NOT NULL, statuts VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_B577E3BFBA490115 (produit_echange_id), INDEX IDX_B577E3BFFB88E14F (utilisateur_id), UNIQUE INDEX UNIQ_B577E3BFF347EFB (produit_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE mission (id INT AUTO_INCREMENT NOT NULL, utilisateur_creer_id INT NOT NULL, utilisateur_accepter_id INT DEFAULT NULL, statuts VARCHAR(255) NOT NULL, difficulte VARCHAR(255) NOT NULL, duree INT NOT NULL, urgence TINYINT(1) NOT NULL, INDEX IDX_9067F23CF17524D (utilisateur_creer_id), INDEX IDX_9067F23CBC314ABE (utilisateur_accepter_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE produit (id INT AUTO_INCREMENT NOT NULL, commercant_id INT DEFAULT NULL, nom VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, type VARCHAR(255) NOT NULL, INDEX IDX_29A5EC2783FA6DD0 (commercant_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\', password VARCHAR(255) NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, adresse VARCHAR(255) NOT NULL, type VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE utilisateur (id INT NOT NULL, point INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL, available_at DATETIME NOT NULL, delivered_at DATETIME DEFAULT NULL, INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE commercant ADD CONSTRAINT FK_ECB4268FBF396750 FOREIGN KEY (id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE demande_echange ADD CONSTRAINT FK_85805810FB88E14F FOREIGN KEY (utilisateur_id) REFERENCES utilisateur (id)');
        $this->addSql('ALTER TABLE demande_echange ADD CONSTRAINT FK_8580581013713818 FOREIGN KEY (echange_id) REFERENCES echange (id)');
        $this->addSql('ALTER TABLE echange ADD CONSTRAINT FK_B577E3BFBA490115 FOREIGN KEY (produit_echange_id) REFERENCES produit (id)');
        $this->addSql('ALTER TABLE echange ADD CONSTRAINT FK_B577E3BFFB88E14F FOREIGN KEY (utilisateur_id) REFERENCES utilisateur (id)');
        $this->addSql('ALTER TABLE echange ADD CONSTRAINT FK_B577E3BFF347EFB FOREIGN KEY (produit_id) REFERENCES produit (id)');
        $this->addSql('ALTER TABLE mission ADD CONSTRAINT FK_9067F23CF17524D FOREIGN KEY (utilisateur_creer_id) REFERENCES utilisateur (id)');
        $this->addSql('ALTER TABLE mission ADD CONSTRAINT FK_9067F23CBC314ABE FOREIGN KEY (utilisateur_accepter_id) REFERENCES utilisateur (id)');
        $this->addSql('ALTER TABLE produit ADD CONSTRAINT FK_29A5EC2783FA6DD0 FOREIGN KEY (commercant_id) REFERENCES commercant (id)');
        $this->addSql('ALTER TABLE utilisateur ADD CONSTRAINT FK_1D1C63B3BF396750 FOREIGN KEY (id) REFERENCES user (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE commercant DROP FOREIGN KEY FK_ECB4268FBF396750');
        $this->addSql('ALTER TABLE demande_echange DROP FOREIGN KEY FK_85805810FB88E14F');
        $this->addSql('ALTER TABLE demande_echange DROP FOREIGN KEY FK_8580581013713818');
        $this->addSql('ALTER TABLE echange DROP FOREIGN KEY FK_B577E3BFBA490115');
        $this->addSql('ALTER TABLE echange DROP FOREIGN KEY FK_B577E3BFFB88E14F');
        $this->addSql('ALTER TABLE echange DROP FOREIGN KEY FK_B577E3BFF347EFB');
        $this->addSql('ALTER TABLE mission DROP FOREIGN KEY FK_9067F23CF17524D');
        $this->addSql('ALTER TABLE mission DROP FOREIGN KEY FK_9067F23CBC314ABE');
        $this->addSql('ALTER TABLE produit DROP FOREIGN KEY FK_29A5EC2783FA6DD0');
        $this->addSql('ALTER TABLE utilisateur DROP FOREIGN KEY FK_1D1C63B3BF396750');
        $this->addSql('DROP TABLE commercant');
        $this->addSql('DROP TABLE demande_echange');
        $this->addSql('DROP TABLE echange');
        $this->addSql('DROP TABLE mission');
        $this->addSql('DROP TABLE produit');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE utilisateur');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
