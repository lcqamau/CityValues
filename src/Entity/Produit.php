<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\ProduitRepository;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ProduitRepository::class)]
#[ApiResource(normalizationContext:["groups"=>"produit_read"])]
class Produit
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups("produit_read")]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["produit_read","panier_read"])]
    public ?string $nom_produit = null;

    #[ORM\Column]
    #[Groups(["produit_read","panier_read"])]
    private ?int $prix = null;

    #[ORM\Column]
    #[Groups(["produit_read"])]
    private ?int $stock = null;

    #[ORM\Column(length: 255)]
    #[Groups(["produit_read","panier_read"])]
    private ?string $photo = null;



    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNomProduit(): ?string
    {
        return $this->nom_produit;
    }

    public function setNomProduit(string $nom_produit): self
    {
        $this->nom_produit = $nom_produit;

        return $this;
    }

    public function getPrix(): ?int
    {
        return $this->prix;
    }

    public function setPrix(int $prix): self
    {
        $this->prix = $prix;

        return $this;
    }

    public function getStock(): ?int
    {
        return $this->stock;
    }

    public function setStock(int $stock): self
    {
        $this->stock = $stock;

        return $this;
    }

    public function getPhoto(): ?string
    {
        return $this->photo;
    }

    public function setPhoto(string $photo): self
    {
        $this->photo = $photo;

        return $this;
    }

}
