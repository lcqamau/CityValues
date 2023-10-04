<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\UtilisateurRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
Use App\Entity\User;

#[ORM\Entity(repositoryClass: UtilisateurRepository::class)]
#[ApiResource]
class Utilisateur extends User
{

    #[ORM\Column]
    private ?int $point = null;

    #[ORM\OneToMany(mappedBy: 'utilisateurCreer', targetEntity: Mission::class, orphanRemoval: true)]
    private Collection $creer;

    #[ORM\OneToMany(mappedBy: 'utilisateurAccepter', targetEntity: Mission::class)]
    private Collection $accepter;

    #[ORM\OneToMany(mappedBy: 'utilisateur', targetEntity: DemandeEchange::class, orphanRemoval: true)]
    private Collection $demandeEchange;

    public function __construct()
    {
        $this->creer = new ArrayCollection();
        $this->accepter = new ArrayCollection();
        $this->demandeEchange = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return parent::getId();
    }

    public function getPoint(): ?int
    {
        return $this->point;
    }

    public function setPoint(int $point): self
    {
        $this->point = $point;

        return $this;
    }

    /**
     * @return Collection<int, Mission>
     */
    public function getCreer(): Collection
    {
        return $this->creer;
    }

    public function addCreer(Mission $creer): self
    {
        if (!$this->creer->contains($creer)) {
            $this->creer->add($creer);
            $creer->setUtilisateurCreer($this);
        }

        return $this;
    }

    public function removeCreer(Mission $creer): self
    {
        if ($this->creer->removeElement($creer)) {
            // set the owning side to null (unless already changed)
            if ($creer->getUtilisateurCreer() === $this) {
                $creer->setUtilisateurCreer(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Mission>
     */
    public function getAccepter(): Collection
    {
        return $this->accepter;
    }

    public function addAccepter(Mission $accepter): self
    {
        if (!$this->accepter->contains($accepter)) {
            $this->accepter->add($accepter);
            $accepter->setUtilisateurAccepter($this);
        }

        return $this;
    }

    public function removeAccepter(Mission $accepter): self
    {
        if ($this->accepter->removeElement($accepter)) {
            // set the owning side to null (unless already changed)
            if ($accepter->getUtilisateurAccepter() === $this) {
                $accepter->setUtilisateurAccepter(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, DemandeEchange>
     */
    public function getDemandeEchange(): Collection
    {
        return $this->demandeEchange;
    }

    public function addDemandeEchange(DemandeEchange $demandeEchange): self
    {
        if (!$this->demandeEchange->contains($demandeEchange)) {
            $this->demandeEchange->add($demandeEchange);
            $demandeEchange->setUtilisateur($this);
        }

        return $this;
    }

    public function removeDemandeEchange(DemandeEchange $demandeEchange): self
    {
        if ($this->demandeEchange->removeElement($demandeEchange)) {
            // set the owning side to null (unless already changed)
            if ($demandeEchange->getUtilisateur() === $this) {
                $demandeEchange->setUtilisateur(null);
            }
        }

        return $this;
    }
}
