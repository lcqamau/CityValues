<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231004230152 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE echange DROP FOREIGN KEY FK_B577E3BFF347EFB');
        $this->addSql('DROP INDEX UNIQ_B577E3BFF347EFB ON echange');
        $this->addSql('ALTER TABLE echange DROP produit_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE echange ADD produit_id INT NOT NULL');
        $this->addSql('ALTER TABLE echange ADD CONSTRAINT FK_B577E3BFF347EFB FOREIGN KEY (produit_id) REFERENCES produit (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_B577E3BFF347EFB ON echange (produit_id)');
    }
}
