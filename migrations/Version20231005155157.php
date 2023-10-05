<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231005155157 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE demande_echange ADD produit_id INT NOT NULL');
        $this->addSql('ALTER TABLE demande_echange ADD CONSTRAINT FK_85805810F347EFB FOREIGN KEY (produit_id) REFERENCES produit (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_85805810F347EFB ON demande_echange (produit_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE demande_echange DROP FOREIGN KEY FK_85805810F347EFB');
        $this->addSql('DROP INDEX UNIQ_85805810F347EFB ON demande_echange');
        $this->addSql('ALTER TABLE demande_echange DROP produit_id');
    }
}
