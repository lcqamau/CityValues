<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ProduitRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProduitRepository::class)]
#[ApiResource]
class Produit
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nom = null;

    #[ORM\Column(length: 255)]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'produits')]
    #[ORM\JoinColumn(nullable: false)]
    private ?TypeProduit $type = null;

    #[ORM\ManyToOne(inversedBy: 'produits')]
    private ?Commercant $commercant = null;

    #[ORM\OneToOne(mappedBy: 'produit', cascade: ['persist', 'remove'])]
    private ?DemandeEchange $demandeEchange = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getType(): ?TypeProduit
    {
        return $this->type;
    }

    public function setType(?TypeProduit $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getCommercant(): ?Commercant
    {
        return $this->commercant;
    }

    public function setCommercant(?Commercant $commercant): self
    {
        $this->commercant = $commercant;

        return $this;
    }

    public function getDemandeEchange(): ?DemandeEchange
    {
        return $this->demandeEchange;
    }

    public function setDemandeEchange(DemandeEchange $demandeEchange): self
    {
        // set the owning side of the relation if necessary
        if ($demandeEchange->getProduit() !== $this) {
            $demandeEchange->setProduit($this);
        }

        $this->demandeEchange = $demandeEchange;

        return $this;
    }
    
}
